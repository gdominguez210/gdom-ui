import {
  useState,
  useEffect,
  useCallback,
  type MouseEventHandler,
  type HTMLAttributes,
  type ElementType,
} from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerControlsProps extends HTMLAttributes<HTMLElement> {
  /** @default div */
  as?: ElementType;
}

export function AudioPlayerControls(props: AudioPlayerControlsProps) {
  const { as = 'div', className, ...restProps } = props;

  const {
    currentTrack,
    currentTime,
    audioRef,
    progressBarRef,
    duration,
    isPlaying,
    setDuration,
    setCurrentTime,
    setCurrentTrackIndex,
    setIsPlaying,
    tracks,
  } = useAudioPlayerContext();

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
      return;
    }
  }, [audioRef, setCurrentTime]);

  const handleNextTrack = useCallback(() => {
    if (shouldLoop) {
      resetTime();
      return;
    }

    setCurrentTrackIndex((prevIndex) => {
      if (shouldShuffle) {
        return Math.floor(Math.random() * tracks.length);
      }

      return prevIndex >= tracks.length - 1 ? 0 : prevIndex + 1;
    });
  }, [shouldShuffle, shouldLoop, setCurrentTrackIndex, tracks, resetTime]);

  const handlePrevTrack: MouseEventHandler<HTMLButtonElement> = () => {
    if (currentTime >= 1 || shouldLoop) {
      resetTime();
      return;
    }

    setCurrentTrackIndex((prevIndex) => {
      if (shouldShuffle) {
        return Math.floor(Math.random() * tracks.length);
      }

      return prevIndex === 0 ? tracks.length - 1 : prevIndex - 1;
    });
  };

  const onLoadedMetadata = useCallback(() => {
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

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('flex justify-center gap-4 items-center text-2xl p-4', className))}
      {...restProps}
    >
      <audio
        src={currentTrack?.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <button
        onClick={toggleLoop}
        className={clsx({ 'text-neutral-100/50': !shouldLoop }, 'hover:text-neutral-100')}
      >
        <Icon
          name="repeat-fill"
          className="scale-75"
        />
      </button>
      <button onClick={handlePrevTrack}>
        <Icon
          name="rewind-start-fill"
          className="scale-90"
        />
      </button>
      <button onClick={togglePlay}>
        {isPlaying ? <Icon name="pause-large-fill" /> : <Icon name="play-large-fill" />}
      </button>
      <button onClick={handleNextTrack}>
        <Icon
          name="forward-end-fill"
          className="scale-90"
        />
      </button>
      <button
        onClick={toggleShuffle}
        className={clsx({ 'text-neutral-100/50': !shouldShuffle }, 'hover:text-neutral-100')}
      >
        <Icon
          name="shuffle-fill"
          className="scale-75"
        />
      </button>
    </Node>
  );
}
