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
  isExpanded?: boolean;
};

/**
 * Button component for toggling playlist visibility
 */
export function AudioPlaylistControlTogglePrimitive(
  props: AudioPlaylistControlTogglePrimitiveProps,
) {
  const { isExpanded = false, ...restProps } = props;

  return (
    <AudioPlayerControlButton
      active={isExpanded}
      aria-label={isExpanded ? 'Hide playlist' : 'Show playlist'}
      aria-expanded={isExpanded}
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
      isExpanded={isPlaylistVisible}
      onClick={handleClick}
      {...restProps}
    />
  );
}
