import { formatAudioDurationForDisplay } from '@lib/AudioPlayerTime/data';

export function useAudioPlayerTime(props: { currentTime: number; duration: number }) {
  const { currentTime, duration } = props;

  return {
    currentTimeDisplay: formatAudioDurationForDisplay(currentTime),
    durationDisplay: formatAudioDurationForDisplay(duration),
  };
}
