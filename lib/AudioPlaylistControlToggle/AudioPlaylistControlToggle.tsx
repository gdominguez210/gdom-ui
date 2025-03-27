import { type ComponentPropsWithRef, type MouseEventHandler, useCallback } from 'react';
import { Icon } from '@lib/Icon';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
import { useComposedRefs } from '@lib/useComposedRefs';
import { useAudioPlaylistContext } from '@lib/AudioPlaylistContextProvider';

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
      <Icon name="play-list-2-fill" />
    </AudioPlayerControlButton>
  );
}

/**
 * Props for the playlist toggle component
 */
export type AudioPlaylistControlToggleProps = Omit<
  AudioPlaylistControlTogglePrimitiveProps,
  'isExpanded'
>;

/**
 * Toggle button for showing/hiding the audio playlist
 */
export function AudioPlaylistControlToggle(props: AudioPlaylistControlToggleProps) {
  const { onClick, ref, ...restProps } = props;
  const { isPlaylistVisible, togglePlaylist, toggleRef } = useAudioPlaylistContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick],
  );

  const composedRef = useComposedRefs(toggleRef, ref);

  return (
    <AudioPlaylistControlTogglePrimitive
      ref={composedRef}
      active={isPlaylistVisible}
      onClick={handleClick}
      {...restProps}
    />
  );
}
