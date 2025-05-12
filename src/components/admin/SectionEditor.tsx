import * as Tabler from '@tabler/icons-react';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import * as React from 'react';

import * as Z from 'zod';
import * as Zfd from 'zod-form-data';

import database from 'server/database';
import * as Schema from 'server/database/schema';
import * as Session from 'server/session';

import Button from 'components/admin/Button';

const SaveSection = Zfd.formData({
  id: Z.coerce.number(),
  heading: Z.string(),
  body: Z.string(),
});
const saveSection = async (form: FormData) => {
  'use server';
  if (!(await Session.check())) throw new Error('unauthorized');

  const data = SaveSection.parse(form);
  await database
    .update(Schema.Content.section)
    .set({ heading: data.heading, body: data.body })
    .where(eq(Schema.Content.section.id, data.id));

  revalidatePath('/admin');
  revalidatePath('/admin/about');
};

const DeleteSection = Zfd.formData({
  id: Z.coerce.number(),
});
const deleteSection = async (form: FormData) => {
  'use server';
  if (!(await Session.check())) throw new Error('unauthorized');

  const data = DeleteSection.parse(form);
  await database
    .delete(Schema.Content.section)
    .where(eq(Schema.Content.section.id, data.id));

  revalidatePath('/admin');
  revalidatePath('/admin/about');
};

const DeleteSectionImage = Zfd.formData({
  section: Z.coerce.number(),
  image: Z.string().uuid(),
});
const deleteSectionImage = async (form: FormData) => {
  'use server';
  if (!(await Session.check())) throw new Error('unauthorized');

  const data = DeleteSectionImage.parse(form);
  await database
    .delete(Schema.Content.sectionImage)
    .where(
      and(
        eq(Schema.Content.sectionImage.section, data.section),
        eq(Schema.Content.sectionImage.image, data.image),
      ),
    );

  revalidatePath('/admin');
  revalidatePath('/admin/about');
};

export default function SectionEditor(props: {
  section: {
    id: number;
    heading: string;
    body: string;
    image: { image: { id: string; data: Buffer } }[];
  };
}) {
  return (
    <div>
      <form action={saveSection} className="grid gap-4 my-8">
        <input type="hidden" name="id" value={props.section.id} />
        <input
          type="text"
          name="heading"
          placeholder="heading"
          className="text-2xl font-bold border border-medium bg-dark rounded-md px-4 py-2"
          defaultValue={props.section.heading}
        />
        <textarea
          name="body"
          placeholder="section content…"
          className="border border-medium rounded-lg px-4 py-2 bg-dark"
          defaultValue={props.section.body}
        />
        <div className="flex justify-end gap-4">
          <Button type="submit">save</Button>
          <Button formAction={deleteSection} type="submit">
            delete
          </Button>
        </div>
      </form>
      <form action={deleteSectionImage}>
        <input type="hidden" name="section" value={props.section.id} />
        <ul className="flex">
          {props.section.image.map((image) => (
            <li
              key={image.image.id}
              className="relative rounded-xl p-2 bg-dark inline-block"
            >
              <img
                className="relative h-48"
                alt="hi"
                src={`/image/${image.image.id}`}
              />
              <button
                className="absolute top-0 right-0 bg-dark rounded-full -mt-2 -mr-2"
                type="submit"
                name="image"
                value={image.image.id}
              >
                <Tabler.IconCircleX />
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
