import { AudioPlayerControlPlayPrimitive } from '@/lib/AudioPlayerControlPlay/AudioPlayerControlPlayPrimitive';
import {
  AudioPlayerImagePrimitive,
  type AudioPlayerImagePrimitiveProps,
} from '@/lib/AudioPlayerImage/AudioPlayerImagePrimitive';
import type { ElementType } from 'react';
import { cn } from '@/utils/cn';

/**
 * Props for the audio playlist track image component
 */
export type AudioPlaylistTrackImagePrimitiveProps<T extends ElementType = 'div'> =
  AudioPlayerImagePrimitiveProps<T> & {
    active?: boolean;
    isPlaying?: boolean;
  };

/**
 * Component for displaying an audio playlist track image
 */
export function AudioPlaylistTrackImagePrimitive(props: AudioPlaylistTrackImagePrimitiveProps) {
  const {
    src,
    altText,
    active = false,
    isPlaying = false,
    width = 48,
    height = 48,
    className,
    ...restProps
  } = props;

  return (
    <div
      className={cn(
        'group',
        'relative',
        'h-12',
        'w-12',
        'shrink-0',
        'overflow-hidden',
        'rounded-md',
        className,
      )}
    >
      <AudioPlayerImagePrimitive
        src={src}
        altText={altText}
        width={width}
        height={height}
        className={cn(
          'h-full',
          'w-full',
          'rounded-md',
          { 'border-2 border-white': active },
          className,
        )}
        {...restProps}
      />
      <div
        className={cn(
          'absolute',
          'inset-0',
          'flex',
          'items-center',
          'justify-center',
          'transition-opacity',
          {
            'opacity-100': active,
            'opacity-0 group-hover:opacity-100 group-focus:opacity-100': !active,
          },
        )}
      >
        <AudioPlayerControlPlayPrimitive
          tabIndex={-1}
          active={active && isPlaying}
          className={cn(
            'border-none',
            'bg-transparent',
            'p-0 text-xl',
            'shadow-none',
            'hover:bg-transparent',
            'focus:bg-transparent',
            'focus:outline-hidden',
          )}
        />
      </div>
    </div>
  );
}
