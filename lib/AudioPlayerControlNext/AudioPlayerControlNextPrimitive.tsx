import type { ComponentPropsWithRef } from 'react';
import { AudioPlayerControlButton } from '@/lib/AudioPlayerControlButton';
import { IconForwardEndFill } from '@/lib/IconForwardEndFill';
/**
 * Props for the next track control button
 */
export type AudioPlayerControlNextPrimitiveProps = ComponentPropsWithRef<'button'>;

/**
 * Base button component for next track navigation
 */
export function AudioPlayerControlNextPrimitive(props: AudioPlayerControlNextPrimitiveProps) {
  return (
    <AudioPlayerControlButton
      aria-label="Next Track"
      {...props}
    >
      <IconForwardEndFill className="scale-90" />
    </AudioPlayerControlButton>
  );
}
