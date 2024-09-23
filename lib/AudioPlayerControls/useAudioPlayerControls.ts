import { useState, useEffect, useCallback, type MouseEventHandler } from 'react';
import { type AudioPlayerContextType } from '@lib/AudioPlayerContextProvider';

function getRandomNumber(min: number, max: number, excludeArray: number[] = []) {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeArray.includes(randomNumber));
  return randomNumber;
}

interface useAudioPlayerControlsProps extends AudioPlayerContextType {}

export function useAudioPlayerControls(props: useAudioPlayerControlsProps) {
  const {
    audioRef,
    currentTime,
    currentTrack,
    duration,
    isPlaying,
    progressBarRef,
    setCurrentTime,
    setCurrentTrackIndex,
    setDuration,
    setIsPlaying,
    tracks,
  } = props;

  const [shouldLoop, setShouldLoop] = useState<boolean>(false);
  const [shouldShuffle, setShouldShuffle] = useState<boolean>(false);

  const togglePlay: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsPlaying((prevState) => !prevState);
  }, [setIsPlaying]);

  const toggleShuffle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShouldShuffle((prevState) => !prevState);
  }, [setShouldShuffle]);

  const toggleLoop: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShouldLoop((prevState) => !prevState);
  }, [setShouldLoop]);

  const resetTime = useCallback(() => {
    if (audioRef?.current) {
      setCurrentTime(0);
      audioRef.current.currentTime = 0;
    }
  }, [audioRef, setCurrentTime]);

  const handleNextTrack = useCallback(() => {
    if (shouldLoop) {
      return resetTime();
    }

    setCurrentTrackIndex((prevIndex) => {
      if (shouldShuffle) {
        return getRandomNumber(0, tracks.length - 1, [prevIndex]);
      }

      return prevIndex >= tracks.length - 1 ? 0 : prevIndex + 1;
    });
  }, [shouldShuffle, shouldLoop, setCurrentTrackIndex, tracks, resetTime]);

  const handlePrevTrack: MouseEventHandler<HTMLButtonElement> = () => {
    if (currentTime >= 1 || shouldLoop) {
      return resetTime();
    }

    setCurrentTrackIndex((prevIndex) => {
      if (shouldShuffle) {
        return getRandomNumber(0, tracks.length - 1, [prevIndex]);
      }

      return prevIndex === 0 ? tracks.length - 1 : prevIndex - 1;
    });
  };

  const handleLoadedMetadata = useCallback(() => {
    const seconds = audioRef.current?.duration;

    if (typeof seconds !== 'undefined') {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  }, [audioRef, progressBarRef, setDuration]);

  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [isPlaying, duration, audioRef, currentTrack]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        shouldLoop ? currentAudioRef.play() : handleNextTrack();
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [shouldLoop, audioRef, handleNextTrack]);

  return {
    handlePrevTrack,
    handleNextTrack,
    handleLoadedMetadata,
    resetTime,
    shouldLoop,
    shouldShuffle,
    togglePlay,
    toggleShuffle,
    toggleLoop,
  };
}
