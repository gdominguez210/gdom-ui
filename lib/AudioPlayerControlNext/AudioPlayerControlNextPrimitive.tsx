import { type ComponentPropsWithRef } from 'react';
import { Icon } from '@lib/Icon/Icon';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';

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
      <Icon
        name="forward-end-fill"
        className="scale-90"
      />
    </AudioPlayerControlButton>
  );
}
