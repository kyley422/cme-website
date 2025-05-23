'use client';

import * as Dnd from '@dnd-kit/react';
import * as React from 'react';

import type { Block, BlockTime } from '@/utils/schedule';
import type * as Time from '@/utils/time';
import * as Action from '../action';

import DetectorSlot from './DetectorSlot';
import ScheduleBlock from './ScheduleBlock';
import {
  type DragData,
  DragType,
  type DropData,
  dayColumn,
  detectorDuration,
  hourEnd,
  hourStart,
} from './utils';

// generate ranges for rendering big arrays of hour/time markers, click detectors, etc.
const hours: number[] = [];
for (let h = hourStart; h <= hourEnd; ++h) hours.push(h);

const detectorSlots: number[] = [];
for (let m = hourStart * 60; m < hourEnd * 60; m += detectorDuration)
  detectorSlots.push(m);

const dayName = { m: 'mon', t: 'tue', w: 'wed', r: 'thu', f: 'fri' } as const;

const computeUpdate: Record<
  DragType,
  (block: BlockTime, drop: DropData) => Partial<BlockTime>
> = {
  [DragType.move]: (_, drop) => ({ day: drop.day, start: drop.minute }),
  [DragType.start]: (block, drop) => ({
    start: drop.minute,
    duration: block.start + block.duration - drop.minute,
  }),
  [DragType.end]: (block, drop) => ({
    duration: drop.minute + detectorDuration - block.start,
  }),
};

export default function Schedule(props: {
  blocks: Record<number, Block>;
}) {
  const [blocks, preUpdate] = React.useOptimistic(
    props.blocks,
    (state, message: { id: number; block: Block }) => ({
      ...state,
      [message.id]: message.block,
    }),
  );

  type DragEnd = NonNullable<
    Parameters<typeof Dnd.DragDropProvider>[0]['onDragEnd']
  >;
  const dragEnd: DragEnd = (event) => {
    if (event.canceled || !event.operation.source || !event.operation.target)
      return;

    const drag = event.operation.source.data as DragData;
    const drop = event.operation.target.data as DropData;

    const block = blocks[drag.id];
    if (!block) throw new Error('bad drag id');

    const update = computeUpdate[drag.type](block, drop);
    React.startTransition(() =>
      preUpdate({ id: drag.id, block: { ...block, ...update } }),
    );
    Action.updateBlock(drag.id, update);
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: 'auto repeat(5, 1fr)',
        gridTemplateRows: `auto repeat(${(hourEnd - hourStart) * 60}, calc(var(--spacing) / 2))`,
      }}
    >
      <Dnd.DragDropProvider onDragEnd={dragEnd}>
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

        {(Object.keys(dayName) as Time.Day[]).map((day) => {
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
              {detectorSlots.map((minute) => (
                <DetectorSlot
                  key={`click-${day}-${minute}`}
                  day={day}
                  minute={minute}
                />
              ))}
            </React.Fragment>
          );
        })}

        {Object.values(blocks).map((block) => (
          <ScheduleBlock key={block.id} block={block} />
        ))}

        <Dnd.DragOverlay>{null}</Dnd.DragOverlay>
      </Dnd.DragDropProvider>
    </div>
  );
}
