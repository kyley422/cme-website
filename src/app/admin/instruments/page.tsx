import * as Tabler from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import * as Z from 'zod';
import { formData } from 'zod-form-data';

import database from '@/server/database';
import * as Schema from '@/server/database/schema';

import { check } from '@/utils/server/action';

const create = async () => {
  'use server';
  await database.insert(Schema.Content.instrument).values({});
  revalidatePath('/admin/instruments');
};

const file = Z.custom<File>((f: unknown) => f instanceof File);

const Save = formData({
  id: Z.coerce.number(),
  image: Z.optional(file).and(
    Z.object({ type: Z.enum(['image/png', 'image/jpeg']) }).passthrough(),
  ),
  title: Z.string(),
});
type T = Z.TypeOf<typeof Save>;
const save = async (form: FormData) => {
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

const Delete = formData({
  id: Z.coerce.number(),
});
const deleteInstrument = async (form: FormData) => {
  'use server';
  const data = await check(Delete, form);
  await database
    .delete(Schema.Content.instrument)
    .where(eq(Schema.Content.instrument.id, data.id));
  revalidatePath('/admin/instruments');
};

export default async function AdminInstruments() {
  const instruments = await database.query.contentInstrument.findMany({
    columns: { image: false },
    with: { image: { columns: { id: true } } },
    orderBy: [Schema.Content.instrument.id],
  });

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
      {instruments.map((instrument) => (
        <li key={instrument.id} className="grid relative">
          <form
            action={deleteInstrument}
            className="absolute top-0 right-0 z-2"
          >
            <input type="hidden" name="id" value={instrument.id} />
            <button
              type="submit"
              className="absolute -right-2 -top-2 bg-dark rounded-full cursor-pointer"
            >
              <Tabler.IconCircleX />
            </button>
          </form>
          <form
            action={save}
            className="grid grid-rows-[1fr_auto] border border-medium rounded-lg overflow-hidden"
          >
            <input type="hidden" name="id" value={instrument.id} />
            <div className="pt-[100%] relative overflow-hidden">
              {instrument.image && (
                <img
                  className="object-cover object-center absolute inset-0 h-full w-full"
                  src={`/image/${instrument.image.id}`}
                  alt={instrument.title}
                />
              )}
            </div>
            <input type="file" name="image" />
            <input
              className="px-2 py-2 bg-dark text-center focus:outline-none"
              name="title"
              defaultValue={instrument.title}
            />
            <button type="submit" className="grid absolute bottom-0 right-0">
              <Tabler.IconCircleCheck />
            </button>
          </form>
        </li>
      ))}
      <li className="relative border border-dark rounded-lg before:pt-[100%] before:content-[''] before:block before:col-start-1 before:row-start-1 grid">
        <form action={create} className="grid col-start-1 row-start-1">
          <button className="col-start-1 row-start-1" type="submit">
            add
          </button>
        </form>
      </li>
    </ul>
  );
}
