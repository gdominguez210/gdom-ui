import type { StoryObj, Meta } from '@storybook/react';
import { AudioPlayer as AudioPlayerComponent } from '@lib/AudioPlayer';
import { trackData } from './data';

export default {
  title: 'components/AudioPlayer',
  component: AudioPlayerComponent,
  subcomponents: {
    AudioPlayerAuthor: AudioPlayerComponent.Author,
    AudioPlayerContextProvider: AudioPlayerComponent.ContextProvider,
    AudioPlayerControls: AudioPlayerComponent.Controls,
    AudioPlayerImage: AudioPlayerComponent.Image,
    AudioPlayerInfo: AudioPlayerComponent.Info,
    AudioPlayerProgressBar: AudioPlayerComponent.ProgressBar,
    AudioPlayerTime: AudioPlayerComponent.Time,
    AudioPlayerTitle: AudioPlayerComponent.Title,
    AudioPlayerVolume: AudioPlayerComponent.Volume,
  },
} as Meta<typeof AudioPlayerComponent>;

export const AudioPlayer: StoryObj<typeof AudioPlayerComponent> = {
  args: {},
  render: () => (
    <AudioPlayerComponent.ContextProvider tracks={trackData}>
      <AudioPlayerComponent>
        <div className="justify-space-between flex flex-grow gap-4">
          <AudioPlayerComponent.Info className="basis-1/3">
            <AudioPlayerComponent.Image />
            <div className="py-2">
              <AudioPlayerComponent.Title />
              <AudioPlayerComponent.Author />
              <AudioPlayerComponent.Time />
            </div>
          </AudioPlayerComponent.Info>
          <AudioPlayerComponent.Controls />
          <AudioPlayerComponent.Volume className="ml-auto pr-4" />
        </div>
        <AudioPlayerComponent.ProgressBar />
      </AudioPlayerComponent>
    </AudioPlayerComponent.ContextProvider>
  ),
};
