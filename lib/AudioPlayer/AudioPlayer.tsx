import { type ComponentPropsWithoutRef, type ElementType, forwardRef, type Ref } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider';

import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlayerControls } from '@lib/AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerImage } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '@lib/AudioPlayerInfo/AudioPlayerInfo';
import { AudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '@lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume/AudioPlayerVolume';

export type AudioPlayerBaseProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithoutRef<T>;

function _AudioPlayerBase<T extends ElementType>(
  props: AudioPlayerBaseProps<T>,
  ref: Ref<T extends ElementType<infer E> ? E : HTMLElement>,
) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      ref={ref}
      className={twMerge(
        clsx('flex flex-col justify-center bg-slate-700 text-neutral-100', className),
      )}
      tabIndex={-1}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export const AudioPlayerBase = forwardRef(_AudioPlayerBase);

export type AudioPlayerProps<T extends ElementType = 'div'> = AudioPlayerBaseProps<T>;

export function AudioPlayer<T extends ElementType>(props: AudioPlayerProps<T>) {
  const { containerRef } = useAudioPlayerContextState();

  return (
    <AudioPlayerBase
      {...props}
      ref={containerRef}
    />
  );
}

AudioPlayer.Author = AudioPlayerAuthor;
AudioPlayer.ContextProvider = AudioPlayerContextProvider;
AudioPlayer.Controls = AudioPlayerControls;
AudioPlayer.Image = AudioPlayerImage;
AudioPlayer.Info = AudioPlayerInfo;
AudioPlayer.ProgressBar = AudioPlayerProgressBar;
AudioPlayer.Time = AudioPlayerTime;
AudioPlayer.Title = AudioPlayerTitle;
AudioPlayer.Volume = AudioPlayerVolume;
