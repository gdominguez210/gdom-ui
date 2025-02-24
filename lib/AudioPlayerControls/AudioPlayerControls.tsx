import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextState';
import { useAudioPlayerContextDispatch } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextDispatch';
import { useAudioPlayerControls } from '@lib/AudioPlayerControls/useAudioPlayerControls';
import { Icon } from '@lib/Icon/Icon';

export type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function AudioPlayerControlsBase<T extends ElementType>(props: AudioPlayerControlsProps<T>) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center justify-center gap-4 p-4 text-2xl', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export interface AudioPlayerControlsButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function AudioPlayerControlsButtonPlay(props: AudioPlayerControlsButtonProps) {
  const { active = false, ...restProps } = props;

  return (
    <button {...restProps}>
      {active ? <Icon name="pause-large-fill" /> : <Icon name="play-large-fill" />}
    </button>
  );
}

export function AudioPlayerControlsButtonLoop(props: AudioPlayerControlsButtonProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <button
      className={twMerge(
        clsx({ 'text-neutral-100/50': !active }, 'hover:text-neutral-100', className),
      )}
      {...restProps}
    >
      {active ? (
        <Icon
          name="repeat-one-fill"
          className="scale-75"
        />
      ) : (
        <Icon
          name="repeat-2-fill"
          className="scale-75"
        />
      )}
    </button>
  );
}

export function AudioPlayerControlsButtonShuffle(props: AudioPlayerControlsButtonProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <button
      className={twMerge(
        clsx({ 'text-neutral-100/50': !active }, 'hover:text-neutral-100', className),
      )}
      {...restProps}
    >
      <Icon
        name="shuffle-fill"
        className="scale-75"
      />
    </button>
  );
}

export function AudioPlayerControlsButtonPrevious(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <Icon
        name="rewind-start-fill"
        className="scale-90"
      />
    </button>
  );
}

export function AudioPlayerControlsButtonNext(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <Icon
        name="forward-end-fill"
        className="scale-90"
      />
    </button>
  );
}

export function AudioPlayerControls(props: AudioPlayerControlsProps) {
  const stateContext = useAudioPlayerContextState();
  const dispatchContext = useAudioPlayerContextDispatch();

  const { audioRef, currentTrack, isPlaying } = stateContext;

  const {
    handleLoadedMetadata,
    handlePrevTrack,
    handleNextTrack,
    shouldLoop,
    shouldShuffle,
    toggleLoop,
    togglePlay,
    toggleShuffle,
  } = useAudioPlayerControls({ ...stateContext, ...dispatchContext });

  return (
    <AudioPlayerControlsBase {...props}>
      <audio
        onLoadedMetadata={handleLoadedMetadata}
        ref={audioRef}
        src={currentTrack?.src}
      />
      <AudioPlayerControlsButtonLoop
        active={shouldLoop}
        onClick={toggleLoop}
      />
      <AudioPlayerControlsButtonPrevious onClick={handlePrevTrack} />
      <AudioPlayerControlsButtonPlay
        active={isPlaying}
        onClick={togglePlay}
      />
      <AudioPlayerControlsButtonNext onClick={handleNextTrack} />
      <AudioPlayerControlsButtonShuffle
        active={shouldShuffle}
        onClick={toggleShuffle}
      />
    </AudioPlayerControlsBase>
  );
}
