import { type AudioPlayerContextType } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { formatAudioDurationForDisplay } from '@lib/AudioPlayerTime/data';

export function useAudioPlayerTime(
  props: Pick<AudioPlayerContextType, 'currentTime' | 'duration'>,
) {
  const { currentTime, duration } = props;

  return {
    currentTimeDisplay: formatAudioDurationForDisplay(currentTime),
    durationDisplay: formatAudioDurationForDisplay(duration),
  };
}
