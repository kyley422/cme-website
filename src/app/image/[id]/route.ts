import { notFound } from 'next/navigation';

import database from '@/server/database';

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;
  if (!id) notFound();

  const result = await database.query.contentImage.findFirst({
    where: (t, r) => r.eq(t.id, id),
    columns: { data: true },
  });
  if (!result) notFound();

  console.log(typeof result.data);

  return new Response(result.data, {
    headers: { 'content-type': 'image/png' },
  });
};
