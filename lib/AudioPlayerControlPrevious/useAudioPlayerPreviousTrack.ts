import { useCallback, type RefObject } from 'react';
import { getNextIndex, getRandomNumber } from '@/lib/AudioPlayerControls/utils';

interface UseAudioPlayerPreviousTrackProps {
  loop: boolean;
  shuffle: boolean;
  currentTrackIndex: number;
  tracksLength: number;
  onTimeChange: (time: number) => void;
  onTrackIndexChange: (index: number) => void;
  audioRef: RefObject<HTMLAudioElement>;
}

export function useAudioPlayerPreviousTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef,
}: UseAudioPlayerPreviousTrackProps) {
  const handlePreviousTrack = useCallback(() => {
    if (audioRef?.current?.currentTime >= 1 || loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }

    if (shuffle) {
      const previousIndex = getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(previousIndex);
    }

    const previousIndex = getNextIndex(currentTrackIndex, tracksLength, -1);

    onTrackIndexChange(previousIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);

  return {
    handlePreviousTrack,
  };
}
