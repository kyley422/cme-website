'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import * as Z from 'zod';
import { formData } from 'zod-form-data';

import * as Action from '@/utils/server/action';
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

export const moveBlock = async (
  block: number,
  day: Time.Day,
  minute: number,
) => {
  await database
    .update(Schema.Content.schedule)
    .set({ start: minuteToString(minute), day })
    .where(eq(Schema.Content.schedule.id, block));
  revalidatePath('/admin/programs');
};

export const deleteBlock = async (id: number) => {
  await database
    .delete(Schema.Content.schedule)
    .where(eq(Schema.Content.schedule.id, id));
  revalidatePath('/admin/programs');
};

export const updateBlock = async (
  block: number,
  time: { day?: Time.Day; start?: number; interval?: number },
) => {
  await database
    .update(Schema.Content.schedule)
    .set({
      start: time.start ? minuteToString(time.start) : undefined,
      interval: time.interval ? minuteToString(time.interval) : undefined,
      day: time.day,
    })
    .where(eq(Schema.Content.schedule.id, block));
  revalidatePath('/admin/programs');
};
