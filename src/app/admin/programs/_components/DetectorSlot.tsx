import * as Dnd from '@dnd-kit/react';

import * as Action from '../action';
import { type DropData, dayColumn, detectorDuration, hourStart } from './utils';

export default function DetectorSlot(props: DropData) {
  const drop = Dnd.useDroppable({
    id: `${props.day}-${props.minute}`,
    data: props,
  });

  const gridColumn = dayColumn[props.day];
  if (!gridColumn) return;

  return (
    <div
      ref={drop.ref}
      style={{
        gridColumn,
        gridRow: `${props.minute - hourStart * 60 + 2} / span ${detectorDuration}`,
      }}
      onDoubleClick={() => Action.newBlock(props.day, props.minute)}
    />
  );
}
