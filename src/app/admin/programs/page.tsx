import { revalidatePath } from 'next/cache';
import * as React from 'react';

import database from 'server/database';
import * as Schema from 'server/database/schema';

import { Schedule } from './Schedule';

const hourStart = 9;
const hourEnd = 21;
const hours: number[] = [];
for (let h = hourStart; h <= hourEnd; ++h) hours.push(h);

export default async function AdminPrograms() {
  const blocks = await database.query.contentSchedule.findMany();

  return (
    <>
      <section>
        <h2 className="text-2xl font-medium">Class &amp; Practice Schedule</h2>
        <Schedule blocks={blocks} />
      </section>
    </>
  );
}
