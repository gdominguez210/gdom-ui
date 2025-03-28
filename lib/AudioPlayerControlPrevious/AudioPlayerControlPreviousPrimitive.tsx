import { type ComponentPropsWithRef } from 'react';
import { Icon } from '@lib/Icon/Icon';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';

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
      <Icon
        name="rewind-start-fill"
        className="scale-90"
      />
    </AudioPlayerControlButton>
  );
}
