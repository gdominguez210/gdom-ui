import { formatDurationForDisplay } from '@lib/utils/formatDurationForDisplay/formatDurationForDisplay';

export function useAudioPlayerTime(props: { currentTime: number; duration: number }) {
  const { currentTime, duration } = props;

  return {
    currentTimeDisplay: formatDurationForDisplay(currentTime),
    durationDisplay: formatDurationForDisplay(duration),
  };
}
