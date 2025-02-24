import { useState, useEffect, useCallback, type MouseEventHandler } from 'react';
import type {
  AudioPlayerContextStateType,
  AudioPlayerContextDispatchType,
} from '@lib/AudioPlayerContextProvider';

function getRandomNumber(min: number, max: number, excludeArray: number[] = []) {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeArray.includes(randomNumber));
  return randomNumber;
}

interface useAudioPlayerControlsProps
  extends AudioPlayerContextStateType,
    AudioPlayerContextDispatchType {}

export function useAudioPlayerControls(props: useAudioPlayerControlsProps) {
  const {
    actions,
    audioRef,
    currentTime,
    currentTrack,
    currentTrackIndex,
    dispatch,
    duration,
    isPlaying,
    progressBarRef,
    tracks,
  } = props;

  const [shouldLoop, setShouldLoop] = useState<boolean>(false);
  const [shouldShuffle, setShouldShuffle] = useState<boolean>(false);

  const togglePlay: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch({ type: actions.SET_IS_PLAYING, payload: { isPlaying: 'toggle' } });
  }, [dispatch, actions]);

  const toggleShuffle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShouldShuffle((prevState) => !prevState);
  }, [setShouldShuffle]);

  const toggleLoop: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShouldLoop((prevState) => !prevState);
  }, [setShouldLoop]);

  const resetTime = useCallback(() => {
    if (audioRef?.current) {
      dispatch({ type: actions.SET_CURRENT_TIME, payload: { currentTime: 0 } });
      audioRef.current.currentTime = 0;
    }
  }, [audioRef, dispatch, actions]);

  const handleNextTrack = useCallback(() => {
    if (shouldLoop) {
      return resetTime();
    }

    const newIndex = shouldShuffle
      ? getRandomNumber(0, tracks.length - 1, [currentTrackIndex])
      : currentTrackIndex >= tracks.length - 1
        ? 0
        : currentTrackIndex + 1;

    dispatch({
      type: actions.SET_CURRENT_TRACK_INDEX,
      payload: { currentTrackIndex: newIndex },
    });
  }, [shouldShuffle, shouldLoop, tracks, resetTime, dispatch, actions, currentTrackIndex]);

  const handlePrevTrack: MouseEventHandler<HTMLButtonElement> = () => {
    if (currentTime >= 1 || shouldLoop) {
      return resetTime();
    }

    const newIndex = shouldShuffle
      ? getRandomNumber(0, tracks.length - 1, [currentTrackIndex])
      : currentTrackIndex === 0
        ? tracks.length - 1
        : currentTrackIndex - 1;

    dispatch({
      type: actions.SET_CURRENT_TRACK_INDEX,
      payload: { currentTrackIndex: newIndex },
    });
  };

  const handleLoadedMetadata = useCallback(() => {
    const seconds = audioRef.current?.duration;

    if (typeof seconds !== 'undefined') {
      dispatch({ type: actions.SET_DURATION, payload: { duration: seconds } });
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  }, [audioRef, progressBarRef, dispatch, actions]);

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
