import { IconPlus } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
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
};

export default function SectionEditor(props: {
  section: { id: number; heading: string; body: string };
}) {
  return (
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
  );
}
