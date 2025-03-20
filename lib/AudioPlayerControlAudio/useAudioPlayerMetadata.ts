import { useCallback, type RefObject } from 'react';

interface UseAudioPlayerMetadataProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  onDurationChange: (duration: number) => void;
}

interface UseAudioPlayerMetadataReturn {
  handleLoadedMetadata: () => void;
}

export function useAudioPlayerMetadata({
  audioRef,
  progressBarRef,
  onDurationChange,
}: UseAudioPlayerMetadataProps): UseAudioPlayerMetadataReturn {
  const handleLoadedMetadata = useCallback(() => {
    const seconds = audioRef.current?.duration;

    if (typeof seconds !== 'undefined') {
      onDurationChange(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  }, [audioRef, progressBarRef, onDurationChange]);

  return { handleLoadedMetadata };
}
