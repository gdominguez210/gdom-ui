import { type ComponentPropsWithRef } from 'react';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
import { IconPlayList2Fill } from '@lib/IconPlayList2Fill';

/**
 * Props for the playlist toggle button primitive component
 */
export type AudioPlaylistControlTogglePrimitiveProps = ComponentPropsWithRef<'button'> & {
  /** Whether the playlist is currently expanded/visible */
  active?: boolean;
};

/**
 * Button component for toggling playlist visibility
 */
export function AudioPlaylistControlTogglePrimitive(
  props: AudioPlaylistControlTogglePrimitiveProps,
) {
  const { active = false, ...restProps } = props;

  return (
    <AudioPlayerControlButton
      active={active}
      aria-label={active ? 'Hide playlist' : 'Show playlist'}
      aria-expanded={active}
      {...restProps}
    >
      <IconPlayList2Fill />
    </AudioPlayerControlButton>
  );
}
