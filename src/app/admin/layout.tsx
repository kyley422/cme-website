import * as Tabler from '@tabler/icons-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import type * as React from 'react';

import NavList from 'components/admin/NavMenu';
import * as Session from 'server/session';

import logo from './logo.svg';

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
      <header className="p-8 grid grid-cols-[auto_1fr] items-center">
        <Image src={logo} alt="hi" className="w-32 -ml-3 -mr-3" />
        <h1 className="text-2xl font-medium w-48">
          UCLA Chinese Music Ensemble
        </h1>
      </header>
      <nav className="p-8 flex flex-col gap-4 col-start-1">
        <NavHeading>pages</NavHeading>
        <NavList />
        <NavHeading>account</NavHeading>
      </nav>
      <main className="row-start-1 col-start-2 row-span-2 p-8">
        {props.children}
      </main>
    </div>
  );
}
