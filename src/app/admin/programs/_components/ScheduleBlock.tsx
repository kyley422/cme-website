import * as Dnd from '@dnd-kit/core';
import * as Tabler from '@tabler/icons-react';

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

  const pos = { day: block.day, start: block.start, duration: block.duration };
  if (drag.isDragging && drag.over) {
    const data = drag.over.data.current as DropData;
    pos.day = data.day;
    pos.start = data.minute;
  } else if (resizeStart.isDragging && resizeStart.over) {
    const data = resizeStart.over.data.current as DropData;
    pos.start = data.minute;
    pos.duration = block.start + block.duration - data.minute;
  } else if (resizeEnd.isDragging && resizeEnd.over) {
    const data = resizeEnd.over.data.current as DropData;
    pos.duration = data.minute + detectorDuration - block.start;
  }

  const gridColumn = dayColumn[pos.day];
  if (!gridColumn) return;

  return (
    <div
      ref={drag.setNodeRef}
      {...drag.attributes}
      className="bg-dark rounded-xl m-2 grid grid-rows-[auto_auto_1fr_auto] overflow-hidden"
      style={{
        gridColumn,
        gridRow: `${Math.max(pos.start - hourStart * 60, 0) + 2} / span ${pos.duration}`,
      }}
    >
      <button
        className="bg-medium h-2 cursor-ns-resize"
        ref={resizeStart.setNodeRef}
        {...resizeStart.listeners}
        {...resizeStart.attributes}
      />
      <div className="flex justify-between">
        <button
          ref={drag.setActivatorNodeRef}
          {...drag.listeners}
          className="cursor-move p-1"
        >
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
          {Time.formatAmPm(pos.start)}&ndash;
          {Time.formatAmPm(pos.start + pos.duration)}
        </div>
      </div>
      <button
        className="bg-medium h-2 cursor-ns-resize"
        ref={resizeEnd.setNodeRef}
        {...resizeEnd.listeners}
        {...resizeEnd.attributes}
      />
    </div>
  );
}
