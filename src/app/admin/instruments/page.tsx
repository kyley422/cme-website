import * as Tabler from '@tabler/icons-react';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import * as Z from 'zod';
import { formData } from 'zod-form-data';

import database from '@/server/database';
import * as Schema from '@/server/database/schema';

import { check } from '@/utils/server/action';
import InstrumentList from './InstrumentList';

const create = async () => {
  'use server';
  await database.insert(Schema.Content.instrument).values({});
  revalidatePath('/admin/instruments');
};

export default async function AdminInstruments() {
  const instruments = await database.query.contentInstrument.findMany({
    columns: { image: false },
    with: { image: { columns: { id: true } } },
    orderBy: [Schema.Content.instrument.order],
  });

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
      <InstrumentList instruments={instruments} />
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
