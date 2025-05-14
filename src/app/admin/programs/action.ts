'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import * as Z from 'zod';
import { formData } from 'zod-form-data';

import * as Action from '@/utils/server/action';
import database from 'server/database';
import * as Schema from 'server/database/schema';

const days = ['m', 't', 'w', 'r', 'f'] as const;

export const newBlock = async (day: number, hour: number) => {
  const dayKey = days[day];
  if (!dayKey) throw new Error('invalid day');
  await database
    .insert(Schema.Content.schedule)
    .values({ start: `${hour}:00`, end: `${hour + 1}:00`, day: dayKey });
  revalidatePath('/admin/programs');
};

export const moveBlock = async (block: number, day: number, hour: number) => {
  const dayKey = days[day];
  if (!dayKey) throw new Error('invalid day');
  await database
    .update(Schema.Content.schedule)
    .set({
      start: `${hour}:00`,
      end: `${hour + 1}:00`,
      day: dayKey,
    })
    .where(eq(Schema.Content.schedule.id, block));
  revalidatePath('/admin/programs');
};

export const deleteBlock = async (id: number) => {
  await database
    .delete(Schema.Content.schedule)
    .where(eq(Schema.Content.schedule.id, id));
  revalidatePath('/admin/programs');
};
