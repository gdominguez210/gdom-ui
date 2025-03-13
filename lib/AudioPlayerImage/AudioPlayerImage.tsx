import type { ComponentPropsWithRef, ElementType } from 'react';
import { Icon } from '@lib/Icon/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

export type AudioPlayerImagePrimitiveProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
  /** @default '' */
  altText: string;
  /** @default 96 */
  width?: number;
  /** @default 96 */
  height?: number;
  src?: string;
} & ComponentPropsWithRef<T>;

export interface AudioPlayerImageProps
  extends Omit<AudioPlayerImagePrimitiveProps, 'src' | 'altText'> {
  /** @default `${title} thumbnail` */
  altText?: string;
}

export function AudioPlayerImagePrimitive(props: AudioPlayerImagePrimitiveProps) {
  const {
    as: Element = 'div',
    altText,
    className,
    width = 96,
    height = 96,
    src,
    ...restProps
  } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'flex h-24 w-24 items-center justify-center overflow-hidden rounded-md bg-neutral-100/10',
          className,
        ),
      )}
      {...restProps}
    >
      {src && (
        <img
          className="h-full w-full object-cover"
          src={src}
          alt={altText}
          width={width}
          height={height}
        />
      )}
      {!src && (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-4xl">
            <Icon name="disc-fill" />
          </span>
        </div>
      )}
    </Element>
  );
}

export function AudioPlayerImage(props: AudioPlayerImageProps) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack();

  return (
    <AudioPlayerImagePrimitive
      {...props}
      src={thumbnail}
      altText={props.altText || `${title} thumbnail`}
    />
  );
}
