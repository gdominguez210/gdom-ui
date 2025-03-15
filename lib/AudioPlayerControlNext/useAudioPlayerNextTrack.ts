import { type RefObject, useCallback, useEffect } from 'react';
import { getNextIndex, getRandomNumber } from '@lib/AudioPlayerControls/utils';

interface UseAudioPlayerNextTrackProps {
  loop: boolean;
  shuffle: boolean;
  currentTrackIndex: number;
  tracksLength: number;
  onTimeChange: (time: number) => void;
  onTrackIndexChange: (index: number) => void;
  audioRef: RefObject<HTMLAudioElement>;
}

export function useAudioPlayerNextTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef,
}: UseAudioPlayerNextTrackProps) {
  const handleNextTrack = useCallback(() => {
    if (audioRef?.current?.currentTime >= 1 || loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }

    if (shuffle) {
      const nextIndex = getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(nextIndex);
    }

    const nextIndex = getNextIndex(currentTrackIndex, tracksLength, 1);

    onTrackIndexChange(nextIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (!currentAudioRef) return;

    const handleEnded = () => {
      if (loop) {
        currentAudioRef.play();
        return;
      }

      handleNextTrack();
    };

    currentAudioRef.addEventListener('ended', handleEnded);
    return () => {
      currentAudioRef.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, handleNextTrack, loop]);

  return {
    handleNextTrack,
  };
}
