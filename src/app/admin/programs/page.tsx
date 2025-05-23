import * as React from 'react';

import database from 'server/database';

import * as Time from '@/utils/time';
import Schedule from './_components/Schedule';
import type * as Lib from './lib';

export default async function AdminPrograms() {
  const blocks: Record<number, Lib.Block> = {};
  for (const block of await database.query.contentSchedule.findMany()) {
    blocks[block.id] = {
      id: block.id,
      day: block.day,
      start: Time.parseMinute(block.start),
      duration: Time.parseMinute(block.duration),
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
