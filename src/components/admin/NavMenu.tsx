'use client';

import * as Tabler from '@tabler/icons-react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import type * as React from 'react';

export default function NavList() {
  return (
    <ul className="flex flex-col">
      <NavItem icon={<Tabler.IconHome />} label="home" link="" />
      <NavItem icon={<Tabler.IconInfoHexagon />} label="about" link="about" />
      <NavItem
        icon={<Tabler.IconMusicCog />}
        label="programs"
        link="programs"
      />
      <NavItem
        icon={<Tabler.IconVideo />}
        label="performances"
        link="performances"
      />
      <NavItem
        icon={<Tabler.IconPiano />}
        label="instruments"
        link="instruments"
      />
    </ul>
  );
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  link: string;
}> = (props) => {
  const currentPath = usePathname();
  const path = `/admin/${props.link}`.replace(/\/$/, '');

  return (
    <li>
      <a
        href={`/admin/${props.link}`}
        className={classNames(
          'grid grid-cols-[auto_1fr] gap-3 capitalize rounded-md p-3 cursor-pointer',
          { 'bg-accent': currentPath === path },
        )}
      >
        {props.icon}
        {props.label}
      </a>
    </li>
  );
};
