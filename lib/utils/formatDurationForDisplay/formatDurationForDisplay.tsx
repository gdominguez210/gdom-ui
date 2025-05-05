import { intervalToDuration } from 'date-fns';

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

export function formatDurationForDisplay(durationInSeconds: number = 0) {
  const {
    hours,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: 0,
    end: durationInSeconds * 1000,
  });

  const formatWithZero = (num: number) => String(num).padStart(2, '0');

  return [hours, minutes, seconds].filter(isDefined).map(formatWithZero).join(':');
}
