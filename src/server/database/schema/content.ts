import { relations } from 'drizzle-orm';
// website content data
import {
  customType,
  date,
  integer,
  interval,
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
  duration: interval({ fields: 'minute' }).notNull().default('1:00'),
});

// general content sections
export const page = (schema.enum as typeof pgEnum)('page', ['home', 'about']);
export const section = schema.table('section', {
  id: serial().primaryKey(),
  heading: text().notNull().default(''),
  body: text().notNull().default(''),
  page: page().notNull(),
});
export const sectionRelations = relations(section, (r) => ({
  image: r.many(sectionImage),
}));

export const instrument = schema.table('instrument', {
  id: serial().primaryKey(),
  title: text().notNull().default(''),
  description: text().notNull().default(''),
  image: uuid().references(() => image.id),
});
export const instrumentRelations = relations(instrument, (r) => ({
  image: r.one(image, { fields: [instrument.image], references: [image.id] }),
}));

export const sectionImage = schema.table('section_image', {
  section: integer()
    .notNull()
    .references(() => section.id, { onDelete: 'cascade' }),
  image: uuid()
    .notNull()
    .references(() => image.id, { onDelete: 'cascade' }),
});
export const sectionImageRelations = relations(sectionImage, (r) => ({
  section: r.one(section, {
    fields: [sectionImage.section],
    references: [section.id],
  }),
  image: r.one(image, { fields: [sectionImage.image], references: [image.id] }),
}));

export const student = schema.table('student', {
  id: serial().primaryKey(),
  name: text().notNull(),
  title: text().notNull(),
  image: uuid()
    .notNull()
    .references(() => image.id),
});

const bytea = customType<{ data: Buffer }>({
  dataType() {
    return 'bytea';
  },
});

export const imageType = (schema.enum as typeof pgEnum)('image_type', [
  'image/png',
  'image/jpeg',
]);
export const image = schema.table('image', {
  id: uuid().primaryKey().defaultRandom(),
  data: bytea().notNull(),
  type: imageType().notNull(),
});

// https://stackoverflow.com/questions/76399047/how-to-represent-bytea-datatype-from-pg-inside-new-drizzle-orm
