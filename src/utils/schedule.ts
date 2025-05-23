import type * as Time from '@/utils/time';

export type Block = {
  id: number;
  day: Time.Day;
  start: number;
  duration: number;
};
export type BlockTime = Omit<Block, 'id'>;
