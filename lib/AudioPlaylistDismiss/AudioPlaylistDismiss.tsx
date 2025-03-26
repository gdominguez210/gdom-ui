import { type ComponentPropsWithRef, type MouseEventHandler, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
import { useAudioPlaylistContext } from '@lib/AudioPlaylistContextProvider';

/**
 * Props for the audio playlist dismiss button primitive component
 */
export type AudioPlaylistDismissPrimitiveProps = ComponentPropsWithRef<'button'>;

/**
 * Button component for dismissing/closing the playlist
 */
export function AudioPlaylistDismissPrimitive(props: AudioPlaylistDismissPrimitiveProps) {
  const { className, ...restProps } = props;

  return (
    <AudioPlayerControlButton
      aria-label="Close playlist"
      className={twMerge(clsx('text-2xl', className))}
      {...restProps}
    >
      <Icon name="close-fill" />
    </AudioPlayerControlButton>
  );
}

/**
 * Props for the playlist dismiss component
 */
export type AudioPlaylistDismissProps = AudioPlaylistDismissPrimitiveProps;

/**
 * Dismiss button that integrates with the playlist toggle context
 */
export function AudioPlaylistDismiss(props: AudioPlaylistDismissProps) {
  const { className, onClick, ...restProps } = props;
  const { togglePlaylist } = useAudioPlaylistContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick],
  );

  return (
    <AudioPlaylistDismissPrimitive
      onClick={handleClick}
      className={className}
      {...restProps}
    />
  );
}

export default AudioPlaylistDismiss;
