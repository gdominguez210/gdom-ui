import { type HTMLAttributes, type ElementType } from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';
import { useAudioPlayerControls } from './useAudioPlayerControls';

export interface AudioPlayerControlsProps extends HTMLAttributes<HTMLElement> {
  /** @default div */
  as?: ElementType;
}

export function AudioPlayerControlsBase(props: AudioPlayerControlsProps) {
  const { as = 'div', children, className, ...restProps } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('flex justify-center gap-4 items-center text-2xl p-4', className))}
      {...restProps}
    >
      {children}
    </Node>
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
  const context = useAudioPlayerContext();

  const { audioRef, currentTrack, isPlaying } = context;

  const {
    handleLoadedMetadata,
    handlePrevTrack,
    handleNextTrack,
    shouldLoop,
    shouldShuffle,
    toggleLoop,
    togglePlay,
    toggleShuffle,
  } = useAudioPlayerControls(context);

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
