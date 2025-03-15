import { useEffect, type RefObject } from 'react';

interface UseAudioPlayerControlPlayProps {
  isPlaying: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTrackIndex: number;
}

export function useAudioPlayerControlPlay(props: UseAudioPlayerControlPlayProps) {
  const { isPlaying, audioRef, currentTrackIndex } = props;

  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [audioRef, isPlaying, currentTrackIndex]);
}
