'use client';

import * as Dnd from '@dnd-kit/core';
import classNames from 'classnames';
import * as React from 'react';
import * as Z from 'zod';

import type * as Schema from 'server/database/schema';

import * as Action from './action';

const hourStart = 9;
const hourEnd = 21;
const hours: number[] = [];
for (let h = hourStart; h <= hourEnd; ++h) hours.push(h);

const parseTime = (t: string) => {
  const [h, m] = t.split(':');
  return { hour: Number.parseInt(h!), minute: Number.parseInt(m!) };
};

const toMinute = (t: { hour: number; minute: number }) =>
  t.hour * 60 + t.minute;

const gridColumn = {
  m: 2,
  t: 3,
  w: 4,
  r: 5,
  f: 6,
};

function ClickBlock(props: {
  day: number;
  hour: number;
}) {
  const drop = Dnd.useDroppable({
    id: `${props.day}-${props.hour}`,
    data: props,
  });

  return (
    <div
      className={classNames('row-span-60', { 'bg-accent': drop.isOver })}
      ref={drop.setNodeRef}
      style={{
        gridColumnStart: props.day + 2,
        gridRowStart: (props.hour - hourStart) * 60 + 2,
      }}
      onDoubleClick={async () => {
        await Action.newBlock(props.day, props.hour);
      }}
    />
  );
}

function ScheduleBlock({
  block,
}: { block: typeof Schema.Content.schedule.$inferSelect }) {
  const drag = Dnd.useDraggable({ id: block.id });

  if (block.day === 'u' || block.day === 's') return;

  const start = toMinute(parseTime(block.start));
  const duration = toMinute(parseTime(block.interval));

  return (
    <div
      ref={drag.setNodeRef}
      {...drag.listeners}
      {...drag.attributes}
      className="bg-dark rounded-xl py-2 px-4 m-2 cursor-pointer"
      onDoubleClick={() => Action.deleteBlock(block.id)}
      style={{
        gridColumn: gridColumn[block.day],
        gridRow: `${Math.max(start - hourStart * 60, 0) + 2} / span ${duration}`,
        transform: drag.transform
          ? `translate3d(${drag.transform.x}px, ${drag.transform.y}px, 0)`
          : undefined,
      }}
    >
      <h4 className="font-semibold">practice time</h4>
    </div>
  );
}

const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
const dayKeys = ['m', 't', 'w', 'r', 'f'] as const;
export function Schedule(props: {
  blocks: (typeof Schema.Content.schedule.$inferSelect)[];
}) {
  const [blocks, replace] = React.useOptimistic(props.blocks);

  return (
    <div className="grid grid-cols-[auto_repeat(5,1fr)] grid-rows-[auto_repeat(720,calc(var(--spacing)/3))]">
      <Dnd.DndContext
        onDragEnd={(event) => {
          if (!event.over) return;

          const { day, hour } = Z.object({
            day: Z.number().int(),
            hour: Z.number().int(),
          }).parse(event.over.data.current);

          const id = Z.number().int().parse(event.active.id);
          const dayKey = dayKeys[day];
          if (!dayKey) return;

          React.startTransition(() =>
            replace(
              blocks.map((b) =>
                b.id === id
                  ? {
                      ...b,
                      day: dayKey,
                      start: `${hour}:00`,
                      end: `${hour + 1}:00`,
                    }
                  : b,
              ),
            ),
          );
          Action.moveBlock(id, day, hour);
        }}
      >
        {days.map((day, i) => (
          <React.Fragment key={day}>
            <div className="row-start-1" style={{ gridColumn: i + 2 }}>
              {day}
            </div>
            <div
              className={classNames(
                'row-start-2 -row-end-1 border-l border-dark',
                { 'border-r': i === 4 },
              )}
              style={{ gridColumn: i + 2 }}
            />
          </React.Fragment>
        ))}

        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div
              className="row-span-60"
              style={{ gridRow: (hour - hourStart) * 60 + 2 }}
            >
              {hour}
            </div>
            <div
              className="row-span-60 col-start-2 -col-end-1 border-t border-dark"
              style={{ gridRow: (hour - hourStart) * 60 + 2 }}
            />
          </React.Fragment>
        ))}

        {days.flatMap((_, day) =>
          hours.map((hour) => (
            <ClickBlock day={day} hour={hour} key={`click-${day}-${hour}`} />
          )),
        )}

        {blocks.map((block) => (
          <ScheduleBlock key={block.id} block={block} />
        ))}
      </Dnd.DndContext>
    </div>
  );
}
