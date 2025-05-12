import * as Blob from '@vercel/blob';

import database from '@/server/database';
import * as Schema from '@/server/database/schema';

export const create = (path: string, data: Buffer) =>
  Promise.all([
    database.insert(Schema.Content.blob).values({ path }),
    Blob.put(path, data, { access: 'public', allowOverwrite: true }),
  ]);
