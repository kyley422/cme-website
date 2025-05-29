'use client';

import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import * as Tabler from '@tabler/icons-react';
import * as React from 'react';

import * as Action from './action';

type Data = { order: number };

function InstrumentCard({
  instrument,
  index,
}: {
  index: number;
  instrument: {
    id: number;
    title: string;
    image: { id: string } | null;
    order: number;
  };
}) {
  const sort = useSortable({
    id: instrument.id,
    index,
    data: { order: instrument.order } satisfies Data,
  });
  const fileInput = React.useRef<HTMLInputElement>(null);

  return (
    <li className="grid relative" ref={sort.ref}>
      <button
        type="button"
        ref={sort.handleRef}
        className="absolute left-1 top-1 cursor-move z-1"
      >
        <Tabler.IconArrowsMove />
      </button>
      <form
        action={Action.deleteInstrument}
        className="absolute top-0 right-0 z-2"
      >
        <input type="hidden" name="id" value={instrument.id} />
        <button type="submit" className="absolute right-1 top-1 cursor-pointer">
          <Tabler.IconX />
        </button>
      </form>
      <form
        action={Action.save}
        className="grid grid-rows-[1fr_auto] border border-medium rounded-lg overflow-hidden"
      >
        <input type="hidden" name="id" value={instrument.id} />
        <div className="pt-[100%] relative overflow-hidden">
          {instrument.image && (
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => fileInput.current?.click()}
            >
              <img
                className="object-cover object-center absolute inset-0 h-full w-full"
                src={`/image/${instrument.image.id}`}
                alt={instrument.title}
              />
            </button>
          )}
        </div>
        <input ref={fileInput} type="file" name="image" />
        <div className="relative bg-dark grid group">
          <input
            className="px-2 py-2 text-center focus:outline-none"
            name="title"
            defaultValue={instrument.title}
          />
          <button
            type="reset"
            className="grid absolute bottom-0 left-0 top-0 items-center px-2 not-group-focus-within:hidden cursor-pointer"
          >
            <Tabler.IconArrowBackUp />
          </button>

          <button
            type="submit"
            className="grid absolute bottom-0 right-0 top-0 items-center px-2 not-group-focus-within:hidden cursor-pointer"
          >
            <Tabler.IconCheck />
          </button>
        </div>
      </form>
    </li>
  );
}

type Instrument = {
  id: number;
  title: string;
  image: { id: string } | null;
  order: number;
};

type Ordered = { order: number };
const sortByOrder = (a: Ordered, b: Ordered) => a.order - b.order;
const reorder = <T extends Ordered>(
  current: readonly T[],
  { from, to }: { from: number; to: number },
) =>
  // https://github.com/clauderic/dnd-kit/blob/7eb0bca8eefccb1108627c9b9af6d4affdb622b5/packages/helpers/src/move.ts#L21-L22
  //return current.slice().splice(move.to, 0, ...current.splice(move.from, 1));
  current
    .map(({ order, ...data }) => ({
      ...data,
      order:
        order === from
          ? to
          : Math.min(from, to) <= order && order <= Math.max(from, to)
            ? order + Math.sign(from - to)
            : order,
    }))
    .sort(sortByOrder);

export default function InstrumentList(props: {
  instruments: {
    id: number;
    title: string;
    image: { id: string } | null;
    order: number;
  }[];
}) {
  const [instruments, apply] = React.useOptimistic<
    Instrument[],
    { from: number; to: number }
  >(props.instruments, reorder);

  return (
    <>
      <DragDropProvider
        onDragEnd={(event) => {
          if (
            event.canceled ||
            !event.operation.source ||
            !event.operation.target
          )
            return;

          // https://github.com/clauderic/dnd-kit/blob/7eb0bca8eefccb1108627c9b9af6d4affdb622b5/packages/helpers/src/move.ts#L72-L90
          const update = {
            from: (event.operation.source.data as Data).order,
            to:
              'index' in event.operation.source &&
              typeof event.operation.source.index === 'number'
                ? instruments[event.operation.source.index]!.order
                : (event.operation.target.data as Data).order,
          };

          apply(update);
          Action.reorder(update);
        }}
      >
        {props.instruments.map((instrument, i) => (
          <InstrumentCard
            key={instrument.id}
            index={i}
            instrument={instrument}
          />
        ))}
      </DragDropProvider>
    </>
  );
}
