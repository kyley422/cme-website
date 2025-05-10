import * as Argon2 from 'argon2';
import * as Z from 'zod';

import database from '@/server/database';
import * as Schema from '@/server/database/schema';

const env = await Z.object({
  SEED_ADMIN_EMAIL: Z.string().email(),
  SEED_ADMIN_PASSWORD: Z.string().transform((s) => Argon2.hash(s)),
}).parseAsync(process.env);

// create admin user
await database
  .insert(Schema.Admin.user)
  .values({
    email: env.SEED_ADMIN_EMAIL,
    password: env.SEED_ADMIN_PASSWORD,
  })
  .onConflictDoUpdate({
    target: Schema.Admin.user.email,
    set: { password: env.SEED_ADMIN_PASSWORD },
  });
