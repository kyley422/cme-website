export type Day = 'u' | 'm' | 't' | 'w' | 'r' | 'f' | 's';

const timePattern = /^(\d+):(\d+)(?::(\d+))?$/;
export const parseMinute = (t: string) => {
  const match = t.match(timePattern);
  if (!match) throw new Error('bad time string', { cause: t });
  const [, h, m] = match as [string, string, string, string];
  return Number.parseInt(h) * 60 + Number.parseInt(m);
};

export const serializeMinute = (m: number) => `${Math.floor(m / 60)}:${m % 60}`;

export const formatAmPm = (n: number) => {
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${((h - 1) % 12) + 1}:${m.toString().padStart(2, '0')}${'ap'[+(h >= 12)]}m`;
};
