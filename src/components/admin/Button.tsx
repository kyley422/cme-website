import type * as React from 'react';

export default function Button(
  props: {
    type: 'submit' | 'reset' | 'button';
    children: React.ReactNode;
  } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  return (
    <button
      {...props}
      className={`${props.className ?? ''} bg-accent font-medium rounded-md py-2 px-4 cursor-pointer`}
    />
  );
}
