import * as Dnd from '@dnd-kit/react';
import * as Tabler from '@tabler/icons-react';
import * as React from 'react';

import type { Block } from '@/utils/schedule';
import * as Time from '@/utils/time';
import * as Action from '../action';
import {
  type DragData,
  DragType,
  type DropData,
  dayColumn,
  detectorDuration,
  hourStart,
} from './utils';

export default function ScheduleBlock({ block }: { block: Block }) {
  const drag = Dnd.useDraggable({
    id: block.id,
    data: { type: DragType.move, id: block.id } satisfies DragData,
  });
  const resizeEnd = Dnd.useDraggable({
    id: `resize-${block.id}`,
    data: { type: DragType.end, id: block.id } satisfies DragData,
  });
  const resizeStart = Dnd.useDraggable({
    id: `start-${block.id}`,
    data: { type: DragType.start, id: block.id } satisfies DragData,
  });

  const [day, setDay] = React.useState(block.day);
  const [start, setStart] = React.useState(block.start);
  const [duration, setDuration] = React.useState(block.duration);
  Dnd.useDragDropMonitor<DropData>({
    onDragOver(event) {
      if (!event.operation.target) return;
      const data = event.operation.target.data as DropData;

      if (drag.isDragging) {
        setDay(data.day);
        setStart(data.minute);
      }
      if (resizeStart.isDragging) {
        setStart(data.minute);
        setDuration(block.start + block.duration - data.minute);
      }
      if (resizeEnd.isDragging) {
        setDuration(data.minute + detectorDuration - block.start);
      }
    },
  });

  const gridColumn = dayColumn[day];
  if (!gridColumn) return;

  return (
    <div
      ref={drag.ref}
      className="bg-dark rounded-xl m-2 grid grid-rows-[auto_auto_1fr_auto] overflow-hidden"
      style={{
        gridColumn,
        gridRow: `${Math.max(start - hourStart * 60, 0) + 2} / span ${duration}`,
      }}
    >
      <button
        className="bg-medium h-2 cursor-ns-resize"
        type="button"
        ref={resizeStart.ref}
      />
      <div className="flex justify-between">
        <button type="button" ref={drag.handleRef} className="cursor-move p-1">
          <Tabler.IconArrowsMove />
        </button>
        <button
          type="button"
          onClick={() => Action.deleteBlock(block.id)}
          className="cursor-pointer p-1"
        >
          <Tabler.IconTrash />
        </button>
      </div>
      <div className="text-center">
        <h4 className="font-semibold px-2">practice time</h4>
        <div>
          {Time.formatAmPm(start)}&ndash;
          {Time.formatAmPm(start + duration)}
        </div>
      </div>
      <button
        className="bg-medium h-2 cursor-ns-resize"
        ref={resizeEnd.ref}
        type="button"
      />
    </div>
  );
}
