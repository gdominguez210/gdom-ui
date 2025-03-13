import { useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

function getRandomNumber(min: number, max: number, excludeArray: number[] = []) {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeArray.includes(randomNumber));
  return randomNumber;
}

function getNextIndex(currentIndex: number, tracksLength: number, direction: number): number {
  return (currentIndex + direction + tracksLength) % tracksLength;
}

interface UseAudioPlayerTrackControlsProps {
  // Audio state
  isPlaying: boolean;
  loop: boolean;
  shuffle: boolean;

  // Track info
  currentTrackIndex: number;
  tracksLength: number;

  // Callbacks
  onTimeChange: (time: number) => void;
  onTrackIndexChange: (index: number) => void;

  // Refs
  audioRef: RefObject<HTMLAudioElement>;
}

export function useAudioPlayerTrackControls({
  isPlaying,
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef,
}: UseAudioPlayerTrackControlsProps) {
  const resetTime = useCallback(() => {
    if (!audioRef?.current) return;

    onTimeChange(0);
    audioRef.current.currentTime = 0;
  }, [audioRef, onTimeChange]);

  const handleNextTrack = useCallback(() => {
    if (loop) return resetTime();

    const newIndex = shuffle
      ? getRandomNumber(0, tracksLength - 1, [currentTrackIndex])
      : getNextIndex(currentTrackIndex, tracksLength, 1);

    onTrackIndexChange(newIndex);
  }, [shuffle, loop, tracksLength, currentTrackIndex, resetTime, onTrackIndexChange]);

  const handlePrevTrack = useCallback(() => {
    if (audioRef?.current?.currentTime >= 1 || loop) {
      return resetTime();
    }

    const newIndex = shuffle
      ? getRandomNumber(0, tracksLength - 1, [currentTrackIndex])
      : getNextIndex(currentTrackIndex, tracksLength, -1);

    onTrackIndexChange(newIndex);
  }, [audioRef, shuffle, loop, tracksLength, currentTrackIndex, resetTime, onTrackIndexChange]);

  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [isPlaying, currentTrackIndex, audioRef]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        loop ? currentAudioRef.play() : handleNextTrack();
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [loop, audioRef, handleNextTrack]);

  return {
    handlePrevTrack,
    handleNextTrack,
    resetTime,
  };
}
