'use client';

import * as Dnd from '@dnd-kit/core';
import * as DndUtils from '@dnd-kit/utilities';
import classNames from 'classnames';
import * as React from 'react';
import * as Z from 'zod';

import type * as Schema from 'server/database/schema';

import * as Action from './action';

// overarching refactors:
// - normalize time formats (parse and serialize time strings only at db interaction time, reduce work on client side)
// - normalize day format: either all letters/enum, or all numbers. don’t mix-and-match.
// - everything in minute units; hour blocks calibrated/indexed by minute data. (scales better to different units too.)

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

enum DragType {
  move = 0,
  start = 1,
  end = 2,
}
const DragData = Z.object({
  type: Z.nativeEnum(DragType),
  id: Z.number().int(),
});
type DragData = Z.TypeOf<typeof DragData>;
const DropData = Z.object({
  day: Z.number().int(),
  hour: Z.number().int(),
});

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
      className={classNames('row-span-60', {
        'bg-accent':
          drop.isOver && drop.active?.data?.current?.type === DragType.move,
      })}
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
  const drag = Dnd.useDraggable({
    id: block.id,
    data: { type: DragType.move, id: block.id } satisfies DragData,
  });

  const resize = Dnd.useDraggable({
    id: `resize-${block.id}`,
    data: { type: DragType.end, id: block.id } satisfies DragData,
  });
  const resizeStart = Dnd.useDraggable({
    id: `start-${block.id}`,
    data: { type: DragType.start, id: block.id } satisfies DragData,
  });

  const defaultStart = toMinute(parseTime(block.start));
  const defaultDuration = toMinute(parseTime(block.interval));
  const defaultEnd = defaultStart + defaultDuration;

  const start =
    resizeStart.isDragging && resizeStart.over
      ? DropData.parse(resizeStart.over.data.current).hour * 60
      : defaultStart;

  const height =
    (resize.isDragging && resize.over
      ? (DropData.parse(resize.over.data.current).hour + 1) * 60
      : defaultEnd) - start;

  if (block.day === 'u' || block.day === 's') return;

  return (
    <div
      ref={drag.setNodeRef}
      {...drag.attributes}
      className="bg-dark rounded-xl m-2 grid grid-rows-[auto_1fr_1fr_auto] overflow-hidden"
      onDoubleClick={() => Action.deleteBlock(block.id)}
      style={{
        gridColumn: gridColumn[block.day],
        gridRow: `${Math.max(start - hourStart * 60, 0) + 2} / span ${height}`,
        transform: drag.transform
          ? `translate3d(${drag.transform.x}px, ${drag.transform.y}px, 0)`
          : undefined,
      }}
    >
      <button
        className="bg-medium h-2 cursor-pointer"
        ref={resizeStart.setNodeRef}
        {...resizeStart.listeners}
        {...resizeStart.attributes}
      />
      <h4 className="font-semibold">practice time</h4>
      <button
        ref={drag.setActivatorNodeRef}
        {...drag.listeners}
        className="cursor-pointer border border-medium"
      >
        drag
      </button>
      <button
        className="bg-medium h-2 cursor-pointer"
        ref={resize.setNodeRef}
        {...resize.listeners}
        {...resize.attributes}
      />
    </div>
  );
}

const detectCollision: Dnd.CollisionDetection = (args) => {
  // TODO: align based on top edge for "move" drags
  const x = Dnd.rectIntersection(args);
  console.log(x);
  return x;
};

const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
const dayKeys = ['m', 't', 'w', 'r', 'f'] as const;
export function Schedule(props: {
  blocks: (typeof Schema.Content.schedule.$inferSelect)[];
}) {
  const [blocks, replace] = React.useOptimistic(props.blocks);

  const lookup: Record<number, (typeof blocks)[number]> = {};
  for (const b of blocks) lookup[b.id] = b;

  return (
    <div className="grid grid-cols-[auto_repeat(5,1fr)] grid-rows-[auto_repeat(720,calc(var(--spacing)/2))]">
      <Dnd.DndContext
        collisionDetection={detectCollision}
        onDragEnd={(event) => {
          if (!event.over) return;

          const { day, hour } = Z.object({
            day: Z.number().int(),
            hour: Z.number().int(),
          }).parse(event.over.data.current);

          const drag = DragData.parse(event.active.data.current);
          const dayKey = dayKeys[day];
          if (!dayKey) return;

          const block = lookup[drag.id];
          if (!block) return;

          const originalStart = toMinute(parseTime(block.start));
          const originalDuration = toMinute(parseTime(block.interval));
          const originalEnd = originalStart + originalDuration;

          if (drag.type === DragType.move) {
            React.startTransition(() =>
              replace(
                blocks.map((b) =>
                  b.id === drag.id
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
            Action.moveBlock(drag.id, day, hour);
          }

          if (drag.type === DragType.end) {
            Action.updateBlock(drag.id, day, {
              durationMinutes: (hour + 1) * 60 - originalStart,
            });
          }

          if (drag.type === DragType.start) {
            Action.updateBlock(drag.id, day, {
              startHour: hour,
              durationMinutes: originalEnd - hour * 60,
            });
          }
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
