import { type ComponentPropsWithRef, type ElementType, memo } from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';

export type AudioPlayerImageProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
  /** @default 96 */
  width?: number;
  /** @default 96 */
  height?: number;
} & ComponentPropsWithRef<T>;

function AudioPlayerImagePrimitive<T extends ElementType>(
  props: AudioPlayerImageProps<T> & { src: string; altText: string },
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
          'flex h-24 w-24 items-center justify-center overflow-hidden rounded-md bg-neutral-100/10',
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

const AudioPlayerImagePrimitiveMemo = memo(AudioPlayerImagePrimitive);
AudioPlayerImagePrimitiveMemo.displayName = 'AudioPlayerImagePrimitive';
export { AudioPlayerImagePrimitiveMemo as AudioPlayerImagePrimitive };

function AudioPlayerImage<T extends ElementType = 'div'>(props: AudioPlayerImageProps<T>) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack();

  return (
    <AudioPlayerImagePrimitive
      {...props}
      src={thumbnail}
      altText={title ? `${title} thumbnail` : ''}
    />
  );
}

const AudioPlayerImageMemo = memo(AudioPlayerImage);
AudioPlayerImageMemo.displayName = 'AudioPlayerImage';
export { AudioPlayerImageMemo as AudioPlayerImage };
