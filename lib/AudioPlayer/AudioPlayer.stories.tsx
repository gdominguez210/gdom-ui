import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from '@lib/AudioPlayer';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { trackData } from './data';

export default {
  title: 'components/AudioPlayer',
  component: AudioPlayer,
  subcomponents: {
    AudioPlayerAuthor: AudioPlayer.Author,
    AudioPlayerContextProvider,
    AudioPlayerControls: AudioPlayer.Controls,
    AudioPlayerImage: AudioPlayer.Image,
    AudioPlayerInfo: AudioPlayer.Info,
    AudioPlayerProgressBar: AudioPlayer.ProgressBar,
    AudioPlayerTime: AudioPlayer.Time,
    AudioPlayerTitle: AudioPlayer.Title,
    AudioPlayerVolume: AudioPlayer.Volume,
  },
} as Meta<typeof AudioPlayer>;

export const Default: StoryObj<typeof AudioPlayer> = {
  args: {
    tracks: trackData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default layout with time display inside the info section',
      },
    },
  },
  render: (args) => (
    <AudioPlayer {...args}>
      <div className="justify-space-between flex flex-grow gap-4">
        <AudioPlayer.Info className="basis-1/3">
          <AudioPlayer.Image />
          <div className="py-2">
            <AudioPlayer.Title />
            <AudioPlayer.Author />
            <AudioPlayer.Time />
          </div>
        </AudioPlayer.Info>
        <AudioPlayer.Controls />
        <AudioPlayer.Volume className="ml-auto pr-4" />
      </div>
      <AudioPlayer.ProgressBar />
    </AudioPlayer>
  ),
};

export const Variation: StoryObj<typeof AudioPlayer> = {
  args: {
    tracks: trackData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Alternative layout with time display as a separate component',
      },
      source: { type: 'dynamic' },
    },
  },
  render: (args) => (
    <AudioPlayer {...args}>
      <AudioPlayer.ProgressBar className="before:bg-red-500 active:[&::-webkit-slider-thumb]:bg-red-500" />
      <div className="justify-space-between flex flex-grow items-center gap-4">
        <AudioPlayer.Info className="basis-1/3">
          <AudioPlayer.Image />
          <div className="py-2">
            <AudioPlayer.Title />
            <AudioPlayer.Author />
          </div>
        </AudioPlayer.Info>
        <div className="flex flex-col items-center justify-center">
          <AudioPlayer.Controls className="py-2" />
        </div>
        <AudioPlayer.Time className="ml-auto px-4 text-lg font-bold" />
      </div>
    </AudioPlayer>
  ),
};
