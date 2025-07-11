import { formatDurationForDisplay } from '@/utils/formatDurationForDisplay';

export function useAudioPlayerTime(props: { currentTime: number; duration: number }) {
  const { currentTime, duration } = props;

  return {
    currentTimeDisplay: formatDurationForDisplay(currentTime),
    durationDisplay: formatDurationForDisplay(duration),
  };
}
