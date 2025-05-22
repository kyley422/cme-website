'use client';

import * as Dnd from '@dnd-kit/core';
import * as DndUtils from '@dnd-kit/utilities';
import classNames from 'classnames';
import * as React from 'react';
import * as Z from 'zod';

import type * as Schema from 'server/database/schema';

import type * as Time from '@/utils/time';
import * as Action from './action';
import type * as Lib from './lib';

// overarching refactors:
// - normalize time formats (parse and serialize time strings only at db interaction time, reduce work on client side)
// - normalize day format: either all letters/enum, or all numbers. don’t mix-and-match.
// - everything in minute units; hour blocks calibrated/indexed by minute data. (scales better to different units too.)

type DropData = { day: Time.Day; minute: number };
enum DragType {
  move = 0,
  start = 1,
  end = 2,
}
type DragData = { type: DragType; id: number };

const hourStart = 9;
const hourEnd = 21;
const hours: number[] = [];
for (let h = hourStart; h <= hourEnd; ++h) hours.push(h);

const dayColumn = {
  m: 2,
  t: 3,
  w: 4,
  r: 5,
  f: 6,
  u: null,
  s: null,
};

function ClickBlock(props: DropData) {
  const drop = Dnd.useDroppable({
    id: `${props.day}-${props.minute}`,
    data: props,
  });

  const gridColumn = dayColumn[props.day];
  if (!gridColumn) return;

  const active = drop.active?.data?.current as DragData | undefined;

  return (
    <div
      className={classNames('row-span-60', {
        'bg-accent': drop.isOver && active?.type === DragType.move,
      })}
      ref={drop.setNodeRef}
      style={{
        gridColumn,
        gridRowStart: props.minute - hourStart * 60 + 2,
      }}
      onDoubleClick={() => Action.newBlock(props.day, props.minute)}
    />
  );
}

function ScheduleBlock({
  block,
}: {
  block: {
    id: number;
    start: number;
    interval: number;
    day: Time.Day;
  };
}) {
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

  const defaultEnd = block.start + block.interval;

  const start =
    resizeStart.isDragging && resizeStart.over
      ? (resizeStart.over.data.current as DropData).minute
      : block.start;

  const height =
    (resize.isDragging && resize.over
      ? (resize.over.data.current as DropData).minute + 60
      : defaultEnd) - start;

  const gridColumn = dayColumn[block.day];
  if (!gridColumn) return;

  return (
    <div
      ref={drag.setNodeRef}
      {...drag.attributes}
      className="bg-dark rounded-xl m-2 grid grid-rows-[auto_1fr_1fr_auto] overflow-hidden"
      onDoubleClick={() => Action.deleteBlock(block.id)}
      style={{
        gridColumn,
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

const scoreWeight: Record<DragType, { top: number; bottom: number }> = {
  [DragType.move]: { top: 1, bottom: 0 },
  [DragType.start]: { top: 1, bottom: 0 },
  [DragType.end]: { top: 0, bottom: 1 },
};

const score = (
  weight: { top: number; bottom: number },
  r: Dnd.ClientRect,
  a: Dnd.ClientRect,
) =>
  weight.top * Math.abs(r.top - a.top) +
  weight.bottom * Math.abs(r.bottom - a.bottom) +
  Math.abs(r.left - a.left) +
  Math.abs(r.right - a.right);

const detectCollision: Dnd.CollisionDetection = (args) => {
  const drag = args.active.data.current as DragData;
  const weight = scoreWeight[drag.type];
  return [...args.droppableRects.entries()]
    .sort(
      ([, a], [, b]) =>
        score(weight, args.collisionRect, a) -
        score(weight, args.collisionRect, b),
    )
    .map(([id]) => ({ id }));
};

const dayName = { m: 'mon', t: 'tue', w: 'wed', r: 'thu', f: 'fri' } as const;

const computeUpdate: Record<
  DragType,
  (block: Lib.Block, drop: DropData) => Partial<Lib.Block>
> = {
  [DragType.move]: (_, drop) => ({ day: drop.day, start: drop.minute }),
  [DragType.start]: (block, drop) => ({
    start: drop.minute,
    interval: block.start + block.interval - drop.minute,
  }),
  [DragType.end]: (block, drop) => ({
    interval: drop.minute + 60 - block.start,
  }),
};

export function Schedule(props: {
  blocks: Record<number, Lib.Block>;
}) {
  const [blocks, replace] = React.useOptimistic(props.blocks);

  return (
    <div className="grid grid-cols-[auto_repeat(5,1fr)] grid-rows-[auto_repeat(720,calc(var(--spacing)/2))]">
      <Dnd.DndContext
        collisionDetection={detectCollision}
        onDragEnd={(event) => {
          if (!event.over) return;

          const drag = event.active.data.current as DragData;
          const drop = event.over.data.current as DropData;

          const block = blocks[drag.id];
          if (!block) throw new Error('bad drag id');

          const update = computeUpdate[drag.type](block, drop);
          React.startTransition(() =>
            replace({ ...blocks, [drag.id]: { ...block, ...update } }),
          );
          Action.updateBlock(drag.id, update);
        }}
      >
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

        {(Object.keys(dayName) as Lib.Day[]).map((day) => {
          const gridColumn = dayColumn[day];
          if (!gridColumn) return;

          return (
            <React.Fragment key={day}>
              <div className="row-start-1" style={{ gridColumn }}>
                {day}
              </div>
              <div
                className={'row-start-2 -row-end-1 border-l border-dark'}
                style={{ gridColumn }}
              />
              {hours.map((hour) => (
                <ClickBlock
                  key={`click-${day}-${hour}`}
                  day={day}
                  minute={hour * 60}
                />
              ))}
            </React.Fragment>
          );
        })}

        {Object.values(blocks).map((block) => (
          <ScheduleBlock key={block.id} block={block} />
        ))}
      </Dnd.DndContext>
    </div>
  );
}
