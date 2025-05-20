import type { ComponentPropsWithRef } from 'react';
import { AudioPlayerControlButton } from '@/lib/AudioPlayerControlButton';
import { IconRewindStartFill } from '@/lib/IconRewindStartFill';
/**
 * Props for the previous track control button
 */
export type AudioPlayerControlPreviousPrimitiveProps = ComponentPropsWithRef<'button'>;

/**
 * Base button component for previous track navigation
 */
export function AudioPlayerControlPreviousPrimitive(
  props: AudioPlayerControlPreviousPrimitiveProps,
) {
  return (
    <AudioPlayerControlButton
      aria-label="Previous Track"
      {...props}
    >
      <IconRewindStartFill className="scale-90" />
    </AudioPlayerControlButton>
  );
}
