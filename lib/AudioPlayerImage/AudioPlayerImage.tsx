import { type HTMLAttributes } from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

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
          'w-24 h-24 flex items-center justify-center bg-neutral-100/10 rounded-md overflow-hidden',
          className,
        ),
      )}
      {...restProps}
    >
      {src && (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={altText}
          width={width}
          height={height}
        />
      )}
      {!src && (
        <div className="flex items-center justify-center w-full h-full">
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
