import { type HTMLAttributes } from 'react';
import { Icon } from '@lib/Icon/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';

export interface AudioPlayerImageBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** @default '' */
  altText: string;
  /** @default 96 */
  width?: number;
  /** @default 96 */
  height?: number;
  src?: string;
}

export interface AudioPlayerImageProps extends Omit<AudioPlayerImageBaseProps, 'src' | 'altText'> {
  /** @default `${title} thumbnail` */
  altText?: string;
}

export function AudioPlayerImageBase(props: AudioPlayerImageBaseProps) {
  const { altText, className, width = 96, height = 96, src, ...restProps } = props;

  return (
    <div
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
    </div>
  );
}

export function AudioPlayerImage(props: AudioPlayerImageProps) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContext();

  return (
    <AudioPlayerImageBase
      {...props}
      src={thumbnail}
      altText={props.altText || `${title} thumbnail`}
    />
  );
}
