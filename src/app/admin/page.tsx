import { IconPlus } from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import * as React from 'react';

import * as Z from 'zod';
import * as Zfd from 'zod-form-data';

import database from 'server/database';
import * as Schema from 'server/database/schema';
import * as Session from 'server/session';

import SectionEditor from 'components/admin/SectionEditor';

const newSection = async () => {
  'use server';
  if (!(await Session.check())) throw new Error('unauthorized');

  await database
    .insert(Schema.Content.section)
    .values([{ heading: '', body: '', page: 'home' }]);
  revalidatePath('/admin');
};

export default async function AdminHome() {
  const sections = await database.query.contentSection.findMany({
    where: (t) => eq(t.page, 'home'),
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Home</h1>
      {sections.map((section) => (
        <SectionEditor key={section.id} section={section} />
      ))}
      <Form action={newSection}>
        <button
          type="submit"
          className="w-full p-4 text-light rounded-xl flex justify-center gap-2 font-semibold"
        >
          <IconPlus />
          new section
        </button>
      </Form>
    </>
  );
}
