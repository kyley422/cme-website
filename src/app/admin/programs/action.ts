'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import type { BlockTime } from '@/utils/schedule';
import type * as Time from '@/utils/time';
import database from 'server/database';
import * as Schema from 'server/database/schema';

const minuteToString = (m: number) => `${Math.floor(m / 60)}:${m % 60}`;

export const newBlock = async (day: Time.Day, minute: number) => {
  await database
    .insert(Schema.Content.schedule)
    .values({ start: minuteToString(minute), day });
  revalidatePath('/admin/programs');
};

export const deleteBlock = async (id: number) => {
  await database
    .delete(Schema.Content.schedule)
    .where(eq(Schema.Content.schedule.id, id));
  revalidatePath('/admin/programs');
};

export const updateBlock = async (block: number, time: Partial<BlockTime>) => {
  await database
    .update(Schema.Content.schedule)
    .set({
      start: time.start ? minuteToString(time.start) : undefined,
      duration: time.duration ? minuteToString(time.duration) : undefined,
      day: time.day,
    })
    .where(eq(Schema.Content.schedule.id, block));
  revalidatePath('/admin/programs');
};
