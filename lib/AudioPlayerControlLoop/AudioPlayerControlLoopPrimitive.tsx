import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { IconRepeatOneFill } from '@lib/IconRepeatOneFill';
import { IconRepeat2Fill } from '@lib/IconRepeat2Fill';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';

/**
 * Props for the loop button primitive component
 */
export interface AudioPlayerControlLoopPrimitiveProps extends ComponentPropsWithRef<'button'> {
  /** Whether loop mode is currently active */
  active?: boolean;
}

/**
 * Base button component for toggling loop playback mode
 */
export function AudioPlayerControlLoopPrimitive(props: AudioPlayerControlLoopPrimitiveProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <AudioPlayerControlButton
      className={twMerge(
        clsx(
          { 'text-neutral-100/50': !active },
          'hover:text-neutral-100',
          'focus-within:text-neutral-100',
          className,
        ),
      )}
      aria-label="Toggle Loop"
      aria-pressed={active}
      {...restProps}
    >
      {active ? (
        <IconRepeatOneFill className="scale-75" />
      ) : (
        <IconRepeat2Fill className="scale-75" />
      )}
    </AudioPlayerControlButton>
  );
}
