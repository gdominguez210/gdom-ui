import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerControlPlay } from '@lib/AudioPlayerControlPlay';
import { AudioPlayerControlLoop } from '@lib/AudioPlayerControlLoop';
import { AudioPlayerControlShuffle } from '@lib/AudioPlayerControlShuffle';
import { AudioPlayerControlAudio } from '@lib/AudioPlayerControlAudio';
import { AudioPlayerControlPrevious } from '@lib/AudioPlayerControlPrevious';
import { AudioPlayerControlNext } from '@lib/AudioPlayerControlNext';

export type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

export function AudioPlayerControlsPrimitive<T extends ElementType>(
  props: AudioPlayerControlsProps<T>,
) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center justify-center gap-4 p-4 text-2xl', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export function AudioPlayerControls(props: AudioPlayerControlsProps) {
  return (
    <AudioPlayerControlsPrimitive {...props}>
      <AudioPlayerControlAudio />
      <AudioPlayerControlLoop />
      <AudioPlayerControlPrevious />
      <AudioPlayerControlPlay />
      <AudioPlayerControlNext />
      <AudioPlayerControlShuffle />
    </AudioPlayerControlsPrimitive>
  );
}
