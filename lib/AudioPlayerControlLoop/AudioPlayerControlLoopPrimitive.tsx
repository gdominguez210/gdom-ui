import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';
import { IconRepeatOneFill } from '@/lib/IconRepeatOneFill';
import { IconRepeat2Fill } from '@/lib/IconRepeat2Fill';
import { AudioPlayerControlButton } from '@/lib/AudioPlayerControlButton';

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
      className={cn(
        'hover:data-[state=inactive]:text-neutral-100',
        'focus-visible:data-[state=inactive]:text-neutral-100',
        'data-[state=inactive]:text-neutral-100/50',
        className,
      )}
      aria-label="Toggle Loop"
      aria-pressed={active}
      active={active}
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
