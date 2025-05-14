import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type AudioPlayerImageProps } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { type ElementType } from 'react';
import { IconDiscFill } from '@lib/IconDiscFill';

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
            <IconDiscFill />
          </span>
        </div>
      )}
    </Element>
  );
}
