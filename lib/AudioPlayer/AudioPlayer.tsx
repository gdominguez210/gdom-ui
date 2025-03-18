import { type ComponentPropsWithRef, type ElementType, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlayerControls } from '@lib/AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerImage } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '@lib/AudioPlayerInfo/AudioPlayerInfo';
import { AudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '@lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume/AudioPlayerVolume';
import type { AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';

export type AudioPlayerPrimitiveProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

function AudioPlayerPrimitive<T extends ElementType>(props: AudioPlayerPrimitiveProps<T>) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
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

const AudioPlayerPrimitiveMemo = memo(AudioPlayerPrimitive);
AudioPlayerPrimitiveMemo.displayName = 'AudioPlayerPrimitive';
export { AudioPlayerPrimitiveMemo as AudioPlayerPrimitive };

export type AudioPlayerProps<T extends ElementType = 'div'> = AudioPlayerPrimitiveProps<T> & {
  tracks: AudioTrackData[];
  /** @default 0 */
  defaultTrackIndex?: number;
  /** @default 50 */
  defaultVolume?: number;
};

function AudioPlayer<T extends ElementType = 'div'>(props: AudioPlayerProps<T>) {
  const { tracks, defaultTrackIndex = 0, defaultVolume = 50, ...restProps } = props;

  return (
    <AudioPlayerContextProvider
      tracks={tracks}
      defaultTrackIndex={defaultTrackIndex}
      defaultVolume={defaultVolume}
    >
      <AudioPlayerPrimitive {...(restProps as AudioPlayerPrimitiveProps<T>)} />
    </AudioPlayerContextProvider>
  );
}

const AudioPlayerRoot = memo(AudioPlayer);
AudioPlayerRoot.displayName = 'AudioPlayer';

const AudioPlayerComponent = Object.assign(AudioPlayerRoot, {
  Author: AudioPlayerAuthor,
  Controls: AudioPlayerControls,
  Image: AudioPlayerImage,
  Info: AudioPlayerInfo,
  ProgressBar: AudioPlayerProgressBar,
  Time: AudioPlayerTime,
  Title: AudioPlayerTitle,
  Volume: AudioPlayerVolume,
}) as typeof AudioPlayerRoot & {
  Author: typeof AudioPlayerAuthor;
  Controls: typeof AudioPlayerControls;
  Image: typeof AudioPlayerImage;
  Info: typeof AudioPlayerInfo;
  ProgressBar: typeof AudioPlayerProgressBar;
  Time: typeof AudioPlayerTime;
  Title: typeof AudioPlayerTitle;
  Volume: typeof AudioPlayerVolume;
};

export { AudioPlayerComponent as AudioPlayer };
