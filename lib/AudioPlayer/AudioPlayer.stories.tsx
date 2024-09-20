import type { StoryObj, Meta } from '@storybook/react';
import { AudioPlayer as AudioPlayerComponent } from '@lib/AudioPlayer';
import type { AudioTrackData } from '@lib/AudioPlayerContextProvider';

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

const data: AudioTrackData[] = [
  {
    title: 'Electro Swing House',
    src: 'https://cdn1.suno.ai/2fdedd0d-a05b-4dda-8c8d-09ba8697a50f.mp3',
    author: 'Gary Dominguez',
    thumbnail: 'https://cdn2.suno.ai/image_7fa89cca-b468-4ec4-9649-70dd745acd12.jpeg',
  },
  {
    title: 'K-Block (Demo)',
    src: 'https://cdn1.suno.ai/a9ef09b8-fbc1-4bd4-ac0c-4a9e82c561ca.mp3',
    author: 'Gary Dominguez',
    thumbnail: 'https://cdn2.suno.ai/image_a9ef09b8-fbc1-4bd4-ac0c-4a9e82c561ca.jpeg',
  },
  {
    title: 'Doomcore',
    src: 'https://cdn1.suno.ai/e5130783-0f8b-4496-8fcd-ae58c0fa02f2.mp3',
    author: 'Gary Dominguez',
    thumbnail: 'https://cdn2.suno.ai/image_ca4a5344-69d6-4967-87a5-324825d0ebaf.jpeg',
  },
  {
    title: 'Doomcore V2',
    src: 'https://cdn1.suno.ai/0ec8d8ef-3f08-4d1a-a7d4-b51536e9b1a7.mp3',
    author: 'Gary Dominguez',
    thumbnail: 'https://cdn2.suno.ai/image_6b1d56d3-c2aa-4b5d-b759-ff9fa2055746.jpeg',
  },
  {
    title: 'Adrift in Space',
    src: 'https://cdn1.suno.ai/f4e9bdb8-04c6-4e98-9ea2-8b4bce21156e.mp3',
    author: 'Gary Dominguez',
    thumbnail: 'https://cdn2.suno.ai/image_7a168d5e-ebbe-470a-a5cd-aebe3318204c.jpeg',
  },
  {
    title: 'The Awakening',
    src: 'https://cdn1.suno.ai/582c6984-bbfd-44cb-a2df-6be4e4cdadf8.mp3',
    author: 'Gary Dominguez',
    thumbnail: 'https://cdn2.suno.ai/image_0769ed7e-5990-4b23-986a-2ca3281e1ac6.jpeg',
  },
] as const;

export const AudioPlayer: StoryObj<typeof AudioPlayerComponent> = {
  args: {},
  render: () => (
    <AudioPlayerComponent.ContextProvider tracks={data}>
      <AudioPlayerComponent>
        <div className="flex flex-grow justify-space-between gap-4">
          <AudioPlayerComponent.Info className="basis-1/3">
            <AudioPlayerComponent.Image />
            <div className="py-2">
              <AudioPlayerComponent.Title />
              <AudioPlayerComponent.Author />
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
