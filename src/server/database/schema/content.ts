// website content data
import {
  date,
  type pgEnum,
  pgSchema,
  serial,
  text,
  time,
  uuid,
} from 'drizzle-orm/pg-core';

export const schema = pgSchema('content');

// performances etc.
export const event = schema.table('event', {
  title: text().notNull(),
  link: text(),
  date: date().notNull(),
  start: time().notNull(),
  end: time().notNull(),
  description: text().notNull(),
});

// practice times, class times etc.
export const day = (schema.enum as typeof pgEnum)('day', [
  'u',
  'm',
  't',
  'w',
  'r',
  'f',
  's',
]);
export const schedule = schema.table('schedule', {
  id: serial().primaryKey(),
  day: day().notNull(),
  start: time({ withTimezone: false, precision: 0 }).notNull(),
  end: time({ withTimezone: false, precision: 0 }).notNull(),
});

// general content sections
export const page = (schema.enum as typeof pgEnum)('page', ['home', 'about']);
export const section = schema.table('section', {
  id: serial().primaryKey(),
  heading: text().notNull(),
  body: text().notNull(),
  page: page().notNull(),
});

export const instrument = schema.table('instrument', {
  title: text().primaryKey(),
  description: text().notNull(),
});
