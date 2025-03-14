import { useEffect, type RefObject } from 'react';

interface UseAudioPlayerPlayProps {
  isPlaying: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTrackIndex: number;
}

export function useAudioPlayerPlay({
  isPlaying,
  audioRef,
  currentTrackIndex,
}: UseAudioPlayerPlayProps) {
  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [audioRef, isPlaying, currentTrackIndex]);
}
