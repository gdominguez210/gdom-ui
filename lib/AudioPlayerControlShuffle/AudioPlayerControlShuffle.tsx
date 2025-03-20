import { type ComponentPropsWithRef, type MouseEventHandler, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';

/**
 * Props for the shuffle button primitive component
 */
export interface AudioPlayerControlShufflePrimitiveProps extends ComponentPropsWithRef<'button'> {
  /** Whether shuffle mode is currently active */
  active?: boolean;
}

/**
 * Base button component for toggling shuffle playback mode
 */
export function AudioPlayerControlShufflePrimitive(props: AudioPlayerControlShufflePrimitiveProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <button
      className={twMerge(
        clsx({ 'text-neutral-100/50': !active }, 'hover:text-neutral-100', className),
      )}
      aria-label="Toggle Shuffle"
      aria-pressed={active}
      {...restProps}
    >
      <Icon
        name="shuffle-fill"
        className="scale-75"
      />
    </button>
  );
}

/**
 * Props for the shuffle control component
 */
export type AudioPlayerControlShuffleProps = Omit<
  AudioPlayerControlShufflePrimitiveProps,
  'active'
>;

/**
 * Shuffle control component that integrates with the audio player context
 */
export function AudioPlayerControlShuffle(props: AudioPlayerControlShuffleProps) {
  const { onClick, ...restProps } = props;
  const { shuffle, toggleShuffle } = useAudioPlayerContextAudio();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      toggleShuffle();
      onClick?.(e);
    },
    [toggleShuffle, onClick],
  );

  return (
    <AudioPlayerControlShufflePrimitive
      active={shuffle}
      onClick={handleClick}
      {...restProps}
    />
  );
}
