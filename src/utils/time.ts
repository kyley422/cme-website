const timeString = /^(\d+):(\d+)(?::(\d+))?$/;
export const parseToMinutes = (t: string) => {
  const match = t.match(timeString);
  if (!match) return match;
  const [h, m] = match as [string, string, string, string];
  return { hour: Number.parseInt(h), minute: Number.parseInt(m) };
};
