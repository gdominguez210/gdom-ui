import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
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
      <Icon
        name={active ? 'repeat-one-fill' : 'repeat-2-fill'}
        className="scale-75"
      />
    </AudioPlayerControlButton>
  );
}
