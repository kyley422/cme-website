import * as Tabler from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import type * as React from 'react';

import NavList from 'components/admin/NavMenu';
import * as Session from 'server/session';

const NavHeading: React.FC<{ children: string }> = (props) => (
  <h2 className="uppercase font-medium text-light">{props.children}</h2>
);

export default async function AdminLayout(props: {
  children: React.ReactNode;
}) {
  const user = await Session.check();
  if (!user) redirect('/admin/login');

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
      <header className="col-span-2 p-8">
        <h1 className="text-xl font-medium">UCLA Chinese Music Ensemble</h1>
      </header>
      <nav className="p-8 flex flex-col gap-4">
        <NavHeading>pages</NavHeading>
        <NavList />
        <NavHeading>account</NavHeading>
      </nav>
      <main>{props.children}</main>
    </div>
  );
}
