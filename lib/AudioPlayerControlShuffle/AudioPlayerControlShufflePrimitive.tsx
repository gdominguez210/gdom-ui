import type { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { IconShuffleFill } from '@/lib/IconShuffleFill';
import { AudioPlayerControlButton } from '@/lib/AudioPlayerControlButton/AudioPlayerControlButton';

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
    <AudioPlayerControlButton
      className={twMerge(
        clsx(
          { 'text-neutral-100/50': !active },
          'hover:text-neutral-100',
          'focus:text-neutral-100',
          className,
        ),
      )}
      aria-label="Toggle Shuffle"
      aria-pressed={active}
      {...restProps}
    >
      <IconShuffleFill className="scale-75" />
    </AudioPlayerControlButton>
  );
}
