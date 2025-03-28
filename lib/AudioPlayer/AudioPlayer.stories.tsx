import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayerPrimitive } from '@lib/AudioPlayer/AudioPlayer';
import { AudioPlayerCompoundComponent } from '@lib/AudioPlayer/namespace';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from './data';
import { AudioPlayerControlPlay } from '@lib/AudioPlayerControlPlay/AudioPlayerControlPlay';
import { AudioPlayerControlNext } from '@lib/AudioPlayerControlNext/AudioPlayerControlNext';
import { AudioPlayerControlPrevious } from '@lib/AudioPlayerControlPrevious/AudioPlayerControlPrevious';
import { AudioPlayerControlShuffle } from '@lib/AudioPlayerControlShuffle/AudioPlayerControlShuffle';
import { AudioPlayerControlLoop } from '@lib/AudioPlayerControlLoop/AudioPlayerControlLoop';
import { AudioPlayerControlAudio } from '@lib/AudioPlayerControlAudio/AudioPlayerControlAudio';
import { AudioPlayerVolumeSlider } from '@lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';
import { AudioPlayerVolumeButton } from '@lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '@lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerImage } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '@lib/AudioPlayerInfo/AudioPlayerInfo';
import {
  AudioPlayerControls,
  AudioPlayerControlsPrimitive,
} from '@lib/AudioPlayerControls/AudioPlayerControls';
import {
  AudioPlayerVolume,
  AudioPlayerVolumePrimitive,
} from '@lib/AudioPlayerVolume/AudioPlayerVolume';
import { AudioPlayerContextAudioProvider } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';
import { AudioPlayerContextTimeProvider } from '@lib/AudioPlayerContextTimeProvider/AudioPlayerContextTimeProvider';
import { AudioPlayerContextRefsProvider } from '@lib/AudioPlayerContextRefsProvider/AudioPlayerContextRefsProvider';
import { AudioPlayerContextTrackProvider } from '@lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrackProvider';
import { AudioPlaylistCompoundComponent } from '@lib/AudioPlaylist/namespace';
import { AudioPlaylistControlToggle } from '@lib/AudioPlaylistControlToggle/AudioPlaylistControlToggle';

export default {
  title: 'components/AudioPlayer',
  component: AudioPlayerPrimitive,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A customizable audio player component',
    docs: {
      source: {
        type: 'dynamic',
        // Custom transformer to hide trackData array contents
        transform: (code: string) => {
          // Replace any array literal in the tracks prop with 'trackData'
          return code.replace(/tracks=\{\[[\s\S]*?\]\}/g, 'tracks={trackData}');
        },
      },
    },
  },
  subcomponents: {
    AudioPlayerAuthor,
    AudioPlayerControls,
    AudioPlayerImage,
    AudioPlayerInfo,
    AudioPlayerProgressBar,
    AudioPlayerTime,
    AudioPlayerTitle,
    AudioPlayerVolume,
    AudioPlayerVolumeSlider,
    AudioPlayerVolumeButton,
    AudioPlayerControlPlay,
    AudioPlayerControlNext,
    AudioPlayerControlPrevious,
    AudioPlayerControlShuffle,
    AudioPlayerControlLoop,
    AudioPlayerControlAudio,
    AudioPlayerContextProvider,
    AudioPlayerContextAudioProvider,
    AudioPlayerContextTimeProvider,
    AudioPlayerContextTrackProvider,
    AudioPlayerContextRefsProvider,
  },
} as Meta<typeof AudioPlayerPrimitive>;

export const Example: StoryObj<typeof AudioPlayerPrimitive> = {
  parameters: {
    docs: {
      description: {
        story: 'An example layout with all available components',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayerCompoundComponent.Provider tracks={trackData}>
      <AudioPlayerCompoundComponent.Root>
        <div className="justify-space-between flex flex-grow gap-4">
          <AudioPlayerCompoundComponent.Info className="basis-1/3">
            <AudioPlayerCompoundComponent.Image />
            <div className="py-2">
              <AudioPlayerCompoundComponent.Title />
              <AudioPlayerCompoundComponent.Author />
              <AudioPlayerCompoundComponent.Time />
            </div>
          </AudioPlayerCompoundComponent.Info>
          <AudioPlayerCompoundComponent.Controls className="basis-1/3" />
          <AudioPlayerCompoundComponent.Volume className="ml-auto pr-4" />
        </div>
        <AudioPlayerCompoundComponent.ProgressBar />
      </AudioPlayerCompoundComponent.Root>
    </AudioPlayerCompoundComponent.Provider>
  ),
};

export const Compact: StoryObj<typeof AudioPlayerPrimitive> = {
  parameters: {
    docs: {
      description: {
        story: 'A more compact layout with less stacked elements ',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayerCompoundComponent.Provider tracks={trackData}>
      <AudioPlayerCompoundComponent.Root>
        <div className="flex flex-grow items-center justify-between gap-4">
          <AudioPlayerControlsPrimitive className="py-2">
            <AudioPlayerCompoundComponent.ControlAudio />
            <AudioPlayerCompoundComponent.ControlPrevious />
            <AudioPlayerCompoundComponent.ControlPlay />
            <AudioPlayerCompoundComponent.ControlNext />
            <AudioPlayerCompoundComponent.Time />
          </AudioPlayerControlsPrimitive>
          <AudioPlayerCompoundComponent.Info className="grow justify-center">
            <AudioPlayerCompoundComponent.Image
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <div className="py-2">
              <AudioPlayerCompoundComponent.Title />
              <AudioPlayerCompoundComponent.Author />
            </div>
          </AudioPlayerCompoundComponent.Info>
          <AudioPlayerVolumePrimitive className="flex basis-[165px]">
            <AudioPlayerVolumeButton />
            <AudioPlayerVolumeSlider />
          </AudioPlayerVolumePrimitive>
          <AudioPlayerControlsPrimitive className="py-2">
            <AudioPlayerCompoundComponent.ControlShuffle className="text-2xl" />
            <AudioPlayerCompoundComponent.ControlLoop className="text-2xl" />
          </AudioPlayerControlsPrimitive>
        </div>
        <AudioPlayerCompoundComponent.ProgressBar className="before:bg-red-600" />
      </AudioPlayerCompoundComponent.Root>
    </AudioPlayerCompoundComponent.Provider>
  ),
};

export const WithCollapsiblePlaylist: StoryObj<typeof AudioPlayerPrimitive> = {
  parameters: {
    docs: {
      description: {
        story:
          'A player with a collapsible playlist that can be toggled with a button or dismissed with the close button in the header',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayerCompoundComponent.Provider tracks={trackData}>
      <AudioPlaylistCompoundComponent.Provider tracks={trackData}>
        <AudioPlayerCompoundComponent.Root className="flex flex-col">
          {/* Collapsible Playlist that appears above */}
          <AudioPlaylistCompoundComponent.ExpandableContainer>
            <AudioPlaylistCompoundComponent.Root>
              <AudioPlaylistCompoundComponent.Header>
                <span>Playlist</span>
                <AudioPlaylistCompoundComponent.Dismiss />
              </AudioPlaylistCompoundComponent.Header>
              <AudioPlaylistCompoundComponent.Tracks className="max-h-[227px] overflow-y-auto" />
            </AudioPlaylistCompoundComponent.Root>
          </AudioPlaylistCompoundComponent.ExpandableContainer>
          <div className="flex flex-grow justify-between gap-4">
            {/* Main Player UI */}
            <AudioPlayerCompoundComponent.Info className="basis-1/3">
              <AudioPlayerCompoundComponent.Image />
              <div className="py-2">
                <AudioPlayerCompoundComponent.Title />
                <AudioPlayerCompoundComponent.Author />
                <AudioPlayerCompoundComponent.Time />
              </div>
            </AudioPlayerCompoundComponent.Info>
            <AudioPlayerCompoundComponent.Controls />
            <div className="flex basis-1/3 items-center justify-end gap-2 px-2">
              <AudioPlayerCompoundComponent.Volume />
              <AudioPlaylistControlToggle className="text-2xl" />
            </div>
          </div>
          <AudioPlayerCompoundComponent.ProgressBar />
        </AudioPlayerCompoundComponent.Root>
      </AudioPlaylistCompoundComponent.Provider>
    </AudioPlayerCompoundComponent.Provider>
  ),
};
