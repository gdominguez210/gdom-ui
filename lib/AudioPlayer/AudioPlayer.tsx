import { type HTMLAttributes, type ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AudioPlayerControls } from '@lib/AudioPlayerControls';
import { AudioPlayerImage } from '@lib/AudioPlayerImage';
import { AudioPlayerInfo } from '@lib/AudioPlayerInfo';
import { AudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@lib/AudioPlayerTime';
import { AudioPlayerTitle } from '@lib/AudioPlayerTitle';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume';

export interface AudioPlayerProps extends HTMLAttributes<HTMLElement> {
  /** @default div */
  as?: ElementType;
}

export function AudioPlayer(props: AudioPlayerProps) {
  const { as = 'div', children, className } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(
        clsx('flex flex-col justify-center bg-slate-700 text-neutral-100', className),
      )}
    >
      {children}
    </Node>
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
