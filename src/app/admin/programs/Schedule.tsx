'use client';

const hourStart = 9;
const hourEnd = 21;
const hours: number[] = [];
for (let h = hourStart; h <= hourEnd; ++h) hours.push(h);

export function ClickBlock(props: {
  day: number;
  hour: number;
  click: () => void;
}) {
  return (
    <div
      className="row-span-60 hover:bg-accent"
      style={{
        gridColumnStart: props.day + 2,
        gridRowStart: (props.hour - hourStart) * 60 + 2,
      }}
      onDoubleClick={props.click}
    />
  );
}
