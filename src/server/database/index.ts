import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';

import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import env from 'server/env';
import * as Schema from './schema';

const prefixKeys = <
  const P extends string,
  const T extends Record<string, unknown>,
>(
  p: P,
  obj: T,
) => {
  const prefixed: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj))
    prefixed[`${p}${k[0].toUpperCase()}${k.slice(1)}`] = v;
  return prefixed as {
    [K in keyof T & string as `${P}${Capitalize<K>}`]: T[K];
  };
};

const schema = {
  ...prefixKeys('admin', Schema.Admin),
  ...prefixKeys('content', Schema.Content),
};

// local and remote databases require different clients/drivers/backends, so… we pick which one to use based on environment variable. (technically we can use `drizzlePg` for both, but for some reason using the actual neon driver for the neon remote is probably better, by idk how much.)
const getDrizzlePg = () =>
  drizzlePg({
    client: new Pool({ connectionString: env.POSTGRES_URL }),
    schema,
    casing: 'snake_case',
  });
const getDrizzleNeon = () =>
  drizzleNeon({
    client: neon(env.POSTGRES_URL),
    schema,
    casing: 'snake_case',
  });

const shouldUseNeon = new URL(env.POSTGRES_URL).hostname.endsWith('.neon.tech');

// super dirty hack: type inference gets a little confused by choosing (dynamically) between two different clients because technically the pg and neon drizzle clients have different type signatures. on the other hand we can/should reasonably *expect* them to actually have the same signatures in all the ways that practically matter (that is, public-facing query APIs), because drizzle’s documentation makes no distinction between different clients. so we trick the type-checker into pretending that only the pg case ever occurs (the other case gets cast to `never`), and this solves our IDE type-inference woes. the *correct* way to go about this is for drizzle upstream to provide an actual abstract typed interface for postgres drizzle clients and ensure each of these clients actually adhere to (i.e., `implements`) that interface.
export default shouldUseNeon ? (getDrizzleNeon() as never) : getDrizzlePg();
