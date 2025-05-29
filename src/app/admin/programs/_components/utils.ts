import type * as Time from '@/utils/time';

export type DropData = { day: Time.Day; minute: number };
export enum DragType {
  move = 0,
  start = 1,
  end = 2,
}
export type DragData = { type: DragType; id: number };

export const detectorDuration = 15;
export const hourStart = 9;
export const hourEnd = 21;

export const dayColumn = {
  m: 2,
  t: 3,
  w: 4,
  r: 5,
  f: 6,
  u: null,
  s: null,
};
