import type * as Z from 'zod';
import { formData } from 'zod-form-data';

import * as Session from '@/server/session';

// this doesn't actually work even though it would be so great if it did:
// see <https://github.com/vercel/next.js/discussions/59911>
// in particular this is an issue with the way next.js detects and compiles server actions,
// via these `use server` annotations. but dynamically generating a server action like this
// confuses next, because i guess we’re passing the schema objects dynamically along with
// the closure and trying to serialize that down to the client side. nextjs is dumb.
//
// now, you _can_ workaround this by defining the action and then re-wrapping it in a server action explicitly:
// const helperAction = action({ … }, async (data: …) => { … })
// const actualAction = async (form: FormData) => { 'use server'; return await helperAction(form); }
// but that’s also a little clunky.
export const action = <const T extends Z.ZodRawShape, const R>(
  shape: T,
  f: (data: Z.TypeOf<Z.ZodObject<T>>) => R | Promise<R>,
) => {
  const schema = formData(shape);

  return async (form: FormData) => {
    // would annotate `use server` here, but fails
    if (!(await Session.check())) throw new Error('unauthorized');

    const result = schema.safeParse(form);
    if (!result.success) throw new Error('bad request');

    return await f(result.data);
  };
};

// this is the next best option to reduce a little bit of repetition. usage:
// const Schema = formData({ … })
// const actualAction = async (form: FormData) => { 'use server', const data = await check(Schema, form); … }
export const check = async <const T extends Z.ZodTypeAny>(
  schema: T,
  form: FormData,
): Promise<Z.TypeOf<T>> => {
  if (!(await Session.check())) throw new Error('unauthorized');

  const result = schema.safeParse(form);
  if (!result.success) throw new Error('bad request');

  return result.data;
};
