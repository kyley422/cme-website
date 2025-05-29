'use server';

import { and, between, eq, lt, lte, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import * as Z from 'zod';
import { formData } from 'zod-form-data';

import database from '@/server/database';
import * as Schema from '@/server/database/schema';
import { check } from '@/utils/server/action';

const Delete = formData({
  id: Z.coerce.number(),
});
export const deleteInstrument = async (form: FormData) => {
  'use server';
  const data = await check(Delete, form);
  await database
    .delete(Schema.Content.instrument)
    .where(eq(Schema.Content.instrument.id, data.id));
  revalidatePath('/admin/instruments');
};

const file = Z.custom<File>((f: unknown) => f instanceof File);
const Save = formData({
  id: Z.coerce.number(),
  image: Z.optional(
    file.and(
      Z.object({ type: Z.enum(['image/png', 'image/jpeg']) }).passthrough(),
    ),
  ),
  title: Z.string(),
});
export const save = async (form: FormData) => {
  'use server';
  const data = await check(Save, form);

  const [image] = data.image
    ? await database
        .insert(Schema.Content.image)
        .values({
          type: data.image.type,
          data: Buffer.from(await data.image.arrayBuffer()),
        })
        .returning({ id: Schema.Content.image.id })
    : [];

  await database
    .update(Schema.Content.instrument)
    .set({ title: data.title, ...(image && { image: image.id }) })
    .where(eq(Schema.Content.instrument.id, data.id));

  revalidatePath('/admin/instruments');
};

export const reorder = async ({ from, to }: { from: number; to: number }) => {
  await database
    .update(Schema.Content.instrument)
    .set({
      order: sql`CASE
          WHEN ${Schema.Content.instrument.order} = ${from} THEN ${to}
          ELSE ${Schema.Content.instrument.order} + ${Math.sign(from - to)} END`,
    })
    .where(
      sql`${Schema.Content.instrument.order} BETWEEN SYMMETRIC ${from} AND ${to}`,
    );

  revalidatePath('/admin/instruments');
};
