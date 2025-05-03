import classNames from 'classnames';
import { revalidatePath } from 'next/cache';
import * as React from 'react';

import database from 'server/database';
import * as Schema from 'server/database/schema';

import { ClickBlock } from './Schedule';
//import { newBlock } from './action';

const parseTime = (t: string) => {
  const [h, m] = t.split(':');
  return { hour: Number.parseInt(h), minute: Number.parseInt(m) };
};

const toMinute = (t: { hour: number; minute: number }) =>
  t.hour * 60 + t.minute;

const gridColumn = {
  m: 2,
  t: 3,
  w: 4,
  r: 5,
  f: 6,
};

const hourStart = 9;
const hourEnd = 21;
const hours: number[] = [];
for (let h = hourStart; h <= hourEnd; ++h) hours.push(h);

const days = ['mon', 'tue', 'wed', 'thu', 'fri'];

const newBlock = async (day: number, hour: number) => {
  const dayKey = (['m', 't', 'w', 'r', 'f'] as const)[day];
  if (!dayKey) throw new Error('invalid day');
  await database
    .insert(Schema.Content.schedule)
    .values({ start: `${hour}:00`, end: `${hour + 1}:00`, day: dayKey });
  revalidatePath('/admin/programs');
};

export default async function AdminPrograms() {
  const blocks = await database.query.contentSchedule.findMany();

  return (
    <>
      <section>
        <h2 className="text-2xl font-medium">Class &amp; Practice Schedule</h2>
        <div className="grid grid-cols-[auto_repeat(5,1fr)] grid-rows-[auto_repeat(720,calc(var(--spacing)/3))]">
          {days.map((day, i) => (
            <React.Fragment key={day}>
              <div className="row-start-1" style={{ gridColumn: i + 2 }}>
                {day}
              </div>
              <div
                className={classNames(
                  'row-start-2 -row-end-1 border-l border-dark',
                  { 'border-r': i === 4 },
                )}
                style={{ gridColumn: i + 2 }}
              />
            </React.Fragment>
          ))}

          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div
                className="row-span-60"
                style={{ gridRow: (hour - hourStart) * 60 + 2 }}
              >
                {hour}
              </div>
              <div
                className="row-span-60 col-start-2 -col-end-1 border-t border-dark"
                style={{ gridRow: (hour - hourStart) * 60 + 2 }}
              />
            </React.Fragment>
          ))}

          {days.flatMap((_, i) =>
            hours.map((hour) => (
              <div
                key={`click-${i}-${hour}`}
                className="row-span-60 cursor-pointer"
                style={{
                  gridColumnStart: i + 2,
                  gridRowStart: (hour - hourStart) * 60 + 2,
                }}
                onDoubleClick={async () => {
                  'use server';
                  await newBlock(i, hour);
                }}
              />
            )),
          )}

          {blocks.map((block) => {
            if (block.day === 'u' || block.day === 's') return;

            const start = toMinute(parseTime(block.start));
            const end = toMinute(parseTime(block.end));

            return (
              <div
                key={block.id}
                className="bg-dark rounded-xl py-2 px-4 m-2"
                style={{
                  gridColumn: gridColumn[block.day],
                  gridRow: `${Math.max(start - hourStart * 60, 0) + 2} / span ${end - start}`,
                }}
              >
                <h4 className="font-semibold">practice time</h4>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
