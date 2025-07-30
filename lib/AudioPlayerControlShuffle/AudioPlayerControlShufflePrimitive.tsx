import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';
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
      className={cn(
        'hover:data-[state=inactive]:text-neutral-100',
        'focus-visible:data-[state=inactive]:text-neutral-100',
        'data-[state=inactive]:text-neutral-100/50',
        className,
      )}
      aria-label="Toggle Shuffle"
      aria-pressed={active}
      active={active}
      {...restProps}
    >
      <IconShuffleFill className="scale-75" />
    </AudioPlayerControlButton>
  );
}
