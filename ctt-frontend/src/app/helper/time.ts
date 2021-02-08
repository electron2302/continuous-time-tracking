export const differenceInMs = (first: Date, second: Date) =>
  first.getTime() - second.getTime();

export const formatDuration = (durationMs: number) => {
  const minutes = Math.floor((durationMs / 1000 / 60) % 60);
  const hours = Math.floor(durationMs / 1000 / 60 / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}`;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const nextDayMidnight = (date: Date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0);
  nextDay.setMinutes(0);
  nextDay.setSeconds(0);
  return nextDay;
};
