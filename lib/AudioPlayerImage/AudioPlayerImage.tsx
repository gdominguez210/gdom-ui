import { type HTMLAttributes } from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerImageProps extends HTMLAttributes<HTMLDivElement> {
  /** @default `${title} thumbnail` */
  altText?: string;
  /** @default 96 */
  width?: number;
  /** @default 96 */
  height?: number;
}

export function AudioPlayerImage(props: AudioPlayerImageProps) {
  const { altText, className, width = 96, height = 96, ...restProps } = props;

  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContext();

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
      {thumbnail && (
        <img
          className="w-full h-full object-cover"
          src={thumbnail}
          alt={altText || `${title} thumbnail`}
          width={width}
          height={height}
        />
      )}
      {!thumbnail && (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-4xl">
            <Icon name="disc-fill" />
          </span>
        </div>
      )}
    </div>
  );
}
