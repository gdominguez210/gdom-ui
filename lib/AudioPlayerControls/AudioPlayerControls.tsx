import { type ComponentPropsWithRef, type ElementType, memo } from 'react';
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

function AudioPlayerControlsPrimitive<T extends ElementType>(props: AudioPlayerControlsProps<T>) {
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

const AudioPlayerControlsPrimitiveMemo = memo(AudioPlayerControlsPrimitive);
AudioPlayerControlsPrimitiveMemo.displayName = 'AudioPlayerControlsPrimitive';
export { AudioPlayerControlsPrimitiveMemo as AudioPlayerControlsPrimitive };

function AudioPlayerControls<T extends ElementType>(props: AudioPlayerControlsProps<T>) {
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

const AudioPlayerControlsMemo = memo(AudioPlayerControls);
AudioPlayerControlsMemo.displayName = 'AudioPlayerControls';
export { AudioPlayerControlsMemo as AudioPlayerControls };
