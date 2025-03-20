import { type ComponentPropsWithRef, type ElementType, type ReactElement } from 'react';
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
import { AudioPlayerVolumeButton } from '@lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerVolumeSlider } from '@lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';
import { AudioPlayerControlAudio } from '@lib/AudioPlayerControlAudio/AudioPlayerControlAudio';
import { AudioPlayerControlPlay } from '@lib/AudioPlayerControlPlay/AudioPlayerControlPlay';
import { AudioPlayerControlPrevious } from '@lib/AudioPlayerControlPrevious/AudioPlayerControlPrevious';
import { AudioPlayerControlNext } from '@lib/AudioPlayerControlNext/AudioPlayerControlNext';
import { AudioPlayerControlShuffle } from '@lib/AudioPlayerControlShuffle/AudioPlayerControlShuffle';
import { AudioPlayerControlLoop } from '@lib/AudioPlayerControlLoop/AudioPlayerControlLoop';
import type { AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';

/**
 * Props for the audio player wrapper component
 */
export type AudioPlayerPrimitiveProps<T extends ElementType = 'div'> = {
  /** Element to render as
   * @default div
   * */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base wrapper component for the audio player UI
 */
export function AudioPlayerPrimitive<T extends ElementType>(props: AudioPlayerPrimitiveProps<T>) {
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

/**
 * Props for the main audio player component
 */
export type AudioPlayerProps<T extends ElementType = 'div'> = AudioPlayerPrimitiveProps<T> & {
  /** Initial track index to play @default 0 */
  defaultTrackIndex?: number;
  /** Initial volume level @default 50 */
  defaultVolume?: number;
  /** Array of tracks to play */
  tracks: AudioTrackData[];
};

/**
 * Type for the AudioPlayer compound component with all subcomponents
 */
export type AudioPlayerCompoundComponentType = (<T extends ElementType = 'div'>(
  props: AudioPlayerProps<T>,
) => ReactElement) & {
  displayName: string;
  Author: typeof AudioPlayerAuthor;
  Controls: typeof AudioPlayerControls;
  Image: typeof AudioPlayerImage;
  Info: typeof AudioPlayerInfo;
  ProgressBar: typeof AudioPlayerProgressBar;
  Time: typeof AudioPlayerTime;
  Title: typeof AudioPlayerTitle;
  Volume: typeof AudioPlayerVolume;
  VolumeButton: typeof AudioPlayerVolumeButton;
  VolumeSlider: typeof AudioPlayerVolumeSlider;
  ControlAudio: typeof AudioPlayerControlAudio;
  ControlPlay: typeof AudioPlayerControlPlay;
  ControlPrevious: typeof AudioPlayerControlPrevious;
  ControlNext: typeof AudioPlayerControlNext;
  ControlShuffle: typeof AudioPlayerControlShuffle;
  ControlLoop: typeof AudioPlayerControlLoop;
};

/**
 * Main audio player component with context provider
 */
export function AudioPlayer<T extends ElementType = 'div'>(props: AudioPlayerProps<T>) {
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

// Set displayName on the base component
AudioPlayer.displayName = 'AudioPlayer';

// Create the compound component with Object.assign
const AudioPlayerCompoundComponent = Object.assign(AudioPlayer, {
  Author: Object.assign(AudioPlayerAuthor, { displayName: 'AudioPlayer.Author' }),
  Controls: Object.assign(AudioPlayerControls, { displayName: 'AudioPlayer.Controls' }),
  Image: Object.assign(AudioPlayerImage, { displayName: 'AudioPlayer.Image' }),
  Info: Object.assign(AudioPlayerInfo, { displayName: 'AudioPlayer.Info' }),
  ProgressBar: Object.assign(AudioPlayerProgressBar, { displayName: 'AudioPlayer.ProgressBar' }),
  Time: Object.assign(AudioPlayerTime, { displayName: 'AudioPlayer.Time' }),
  Title: Object.assign(AudioPlayerTitle, { displayName: 'AudioPlayer.Title' }),
  Volume: Object.assign(AudioPlayerVolume, { displayName: 'AudioPlayer.Volume' }),
  VolumeButton: Object.assign(AudioPlayerVolumeButton, {
    displayName: 'AudioPlayer.VolumeButton',
  }),
  VolumeSlider: Object.assign(AudioPlayerVolumeSlider, {
    displayName: 'AudioPlayer.VolumeSlider',
  }),
  ControlAudio: Object.assign(AudioPlayerControlAudio, {
    displayName: 'AudioPlayer.ControlAudio',
  }),
  ControlPlay: Object.assign(AudioPlayerControlPlay, { displayName: 'AudioPlayer.ControlPlay' }),
  ControlPrevious: Object.assign(AudioPlayerControlPrevious, {
    displayName: 'AudioPlayer.ControlPrevious',
  }),
  ControlNext: Object.assign(AudioPlayerControlNext, { displayName: 'AudioPlayer.ControlNext' }),
  ControlShuffle: Object.assign(AudioPlayerControlShuffle, {
    displayName: 'AudioPlayer.ControlShuffle',
  }),
  ControlLoop: Object.assign(AudioPlayerControlLoop, { displayName: 'AudioPlayer.ControlLoop' }),
});

// Create the final exported component with explicit displayName for Storybook
AudioPlayerCompoundComponent.displayName = 'AudioPlayer';

export { AudioPlayerCompoundComponent };
