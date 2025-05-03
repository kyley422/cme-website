import database from 'server/database';
import * as Schema from 'server/database/schema';

export const newBlock = async (day: number, hour: number) => {
  'use server';

  const dayKey = (['m', 't', 'w', 'r', 'f'] as const)[day];
  if (!dayKey) throw new Error('invalid day');
  await database
    .insert(Schema.Content.schedule)
    .values({ start: `${hour}:00`, end: `${hour + 1}:00`, day: dayKey });
};
