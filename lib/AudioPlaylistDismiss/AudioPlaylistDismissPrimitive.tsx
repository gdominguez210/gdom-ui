import type { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { IconCloseFill } from '@/lib/IconCloseFill';
import { AudioPlayerControlButton } from '@/lib/AudioPlayerControlButton';

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
      <IconCloseFill />
    </AudioPlayerControlButton>
  );
}
