export type Day = 'u' | 'm' | 't' | 'w' | 'r' | 'f' | 's';
export type Block = { id: number; day: Day; start: number; interval: number };

const timePattern = /^(\d+):(\d+)(?::(\d+))?$/;
export const parseMinute = (t: string) => {
  const match = t.match(timePattern);
  if (!match) return match;
  const [h, m] = match as [string, string, string, string];
  return { hour: Number.parseInt(h), minute: Number.parseInt(m) };
};

export const serializeMinute = (m: number) => `${Math.floor(m / 60)}:${m % 60}`;
