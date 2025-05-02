import * as Tabler from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import type * as React from 'react';

import * as Session from 'server/session';

const NavItem: React.FC<{ icon: React.ReactNode; label: string }> = (props) => (
  <li>
    <a
      href="?"
      className="grid grid-cols-[auto_1fr] gap-3 capitalize rounded-md p-3 cursor-pointer"
    >
      {props.icon}
      {props.label}
    </a>
  </li>
);

export default async function AdminLayout(props: {
  children: React.ReactNode;
}) {
  const user = await Session.check();
  if (!user) redirect('/admin/login');

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
      <header className="col-span-2">
        <h1 className="text-xl font-medium">UCLA Chinese Music Ensemble</h1>
      </header>
      <nav>
        <h2 className="uppercase font-medium text-light">pages</h2>
        <ul className="flex flex-col">
          <NavItem icon={<Tabler.IconHome />} label="home" />
          <NavItem icon={<Tabler.IconInfoHexagon />} label="about" />
          <NavItem icon={<Tabler.IconMusicCog />} label="programs" />
          <NavItem icon={<Tabler.IconVideo />} label="performances" />
          <NavItem icon={<Tabler.IconPiano />} label="instruments" />
          <NavItem icon={<Tabler.IconCalendarEvent />} label="classes" />
        </ul>
        <h2 className="uppercase font-medium text-light">account</h2>
      </nav>
      <main>{props.children}</main>
    </div>
  );
}
