import type { ComponentPropsWithRef } from 'react';
import { IconCloseFill } from '@/lib/IconCloseFill';
import { AudioPlayerControlButton } from '@/lib/AudioPlayerControlButton';
import { cn } from '@/utils/cn';

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
      className={cn('text-2xl', className)}
      {...restProps}
    >
      <IconCloseFill />
    </AudioPlayerControlButton>
  );
}
