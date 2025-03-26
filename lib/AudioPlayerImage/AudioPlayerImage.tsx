import { type ComponentPropsWithRef, type ElementType } from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';

/**
 * Props for the audio track image component
 */
export type AudioPlayerImageProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
  /** Image width in pixels @default 96 */
  width?: number;
  /** Image height in pixels @default 96 */
  height?: number;
} & ComponentPropsWithRef<T>;

export type AudioPlayerImagePrimitiveProps<T extends ElementType = 'div'> =
  AudioPlayerImageProps<T> & {
    src: string;
    altText: string;
  };

/**
 * Base component for displaying an audio track image or placeholder
 */
export function AudioPlayerImagePrimitive<T extends ElementType>(
  props: AudioPlayerImagePrimitiveProps<T>,
) {
  const {
    as: Element = 'div',
    className,
    altText,
    width = 96,
    height = 96,
    src,
    ...restProps
  } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'flex h-24 w-24 items-center justify-center overflow-hidden bg-neutral-100/10',
          className,
        ),
      )}
      {...restProps}
    >
      {src ? (
        <img
          src={src}
          alt={altText}
          className="h-full w-full object-cover"
          width={width}
          height={height}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-4xl">
            <Icon name="disc-fill" />
          </span>
        </div>
      )}
    </Element>
  );
}

/**
 * Displays the thumbnail for the current audio track
 * Shows a placeholder icon if no thumbnail is available
 */
export function AudioPlayerImage<T extends ElementType = 'div'>(props: AudioPlayerImageProps<T>) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack();

  return (
    <AudioPlayerImagePrimitive
      {...props}
      src={thumbnail}
      altText={title ? `${title} thumbnail` : ''}
    />
  );
}
