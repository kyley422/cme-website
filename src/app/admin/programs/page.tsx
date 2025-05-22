import { revalidatePath } from 'next/cache';
import * as React from 'react';

import database from 'server/database';
import * as Schema from 'server/database/schema';

import { Schedule } from './Schedule';
import type * as Lib from './lib';

const parseMinutes = (t: string) => {
  const match = t.match(/^(\d+):(\d+)(?::(\d+))?$/);
  if (!match) throw new Error('invalid time', { cause: t });
  const [, h, m] = match as [string, string, string, string | undefined];
  return Number.parseInt(h) * 60 + Number.parseInt(m);
};

export default async function AdminPrograms() {
  const blocksRaw = await database.query.contentSchedule.findMany();

  const blocks: Record<number, Lib.Block> = {};
  for (const block of blocksRaw) {
    blocks[block.id] = {
      id: block.id,
      day: block.day,
      start: parseMinutes(block.start),
      interval: parseMinutes(block.interval),
    };
  }

  return (
    <>
      <section>
        <h2 className="text-2xl font-medium">Class &amp; Practice Schedule</h2>
        <Schedule blocks={blocks} />
      </section>
    </>
  );
}
