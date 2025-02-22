import clsx from 'clsx';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlayerControls } from '@lib/AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerImage } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '@lib/AudioPlayerInfo/AudioPlayerInfo';
import { AudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '@lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume/AudioPlayerVolume';

export type AudioPlayerProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function AudioPlayer<T extends ElementType>(props: AudioPlayerProps<T>) {
  const { as: Element = 'div', children, className } = props;

  return (
    <Element
      className={twMerge(
        clsx('flex flex-col justify-center bg-slate-700 text-neutral-100', className),
      )}
    >
      {children}
    </Element>
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
