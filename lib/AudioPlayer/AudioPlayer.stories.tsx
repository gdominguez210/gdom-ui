import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from '@lib/AudioPlayer/AudioPlayer';
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
import { AudioPlayerControls } from '@lib/AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume/AudioPlayerVolume';
import { AudioPlayerContextAudioProvider } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';
import { AudioPlayerContextTimeProvider } from '@lib/AudioPlayerContextTimeProvider/AudioPlayerContextTimeProvider';
import { AudioPlayerContextRefsProvider } from '@lib/AudioPlayerContextRefsProvider/AudioPlayerContextRefsProvider';
import { AudioPlayerContextTrackProvider } from '@lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrackProvider';
import { AudioPlaylistCompoundComponent } from '@lib/AudioPlaylist/namespace';

export default {
  title: 'components/AudioPlayer',
  component: AudioPlayer,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A customizable audio player component',
    docs: {
      source: {
        type: 'dynamic',
        // Custom transformer to hide trackData array contents
        transform: (code: string) => {
          // Replace any array literal in the tracks prop with 'trackData'
          code = code.replace(/tracks=\{\[[\s\S]*?\]\}/g, 'tracks={trackData}');
          return code;
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
} as Meta<typeof AudioPlayer>;

export const Example: StoryObj<typeof AudioPlayer> = {
  parameters: {
    docs: {
      description: {
        story: 'An example layout with all available components',
      },
      canvas: {
        sourceState: 'shown',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayerCompoundComponent.Provider tracks={trackData}>
      <AudioPlayerCompoundComponent.Root>
        <div className="justify-space-between flex grow gap-4">
          <AudioPlayerCompoundComponent.Info className="basis-1/3">
            <AudioPlayerCompoundComponent.Image />
            <div className="py-2">
              <AudioPlayerCompoundComponent.Title />
              <AudioPlayerCompoundComponent.Author />
              <AudioPlayerCompoundComponent.Time />
            </div>
          </AudioPlayerCompoundComponent.Info>
          <AudioPlayerCompoundComponent.Controls className="basis-1/3">
            <AudioPlayerCompoundComponent.ControlAudio />
            <AudioPlayerCompoundComponent.ControlLoop />
            <AudioPlayerCompoundComponent.ControlPrevious />
            <AudioPlayerCompoundComponent.ControlPlay />
            <AudioPlayerCompoundComponent.ControlNext />
            <AudioPlayerCompoundComponent.ControlShuffle />
          </AudioPlayerCompoundComponent.Controls>
          <AudioPlayerCompoundComponent.Volume className="ml-auto pr-4">
            <AudioPlayerCompoundComponent.VolumeButton />
            <AudioPlayerCompoundComponent.VolumeSlider />
          </AudioPlayerCompoundComponent.Volume>
        </div>
        <AudioPlayerCompoundComponent.ProgressBar />
      </AudioPlayerCompoundComponent.Root>
    </AudioPlayerCompoundComponent.Provider>
  ),
};

export const Compact: StoryObj<typeof AudioPlayer> = {
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
        <div className="flex grow items-center justify-between gap-4">
          <AudioPlayerCompoundComponent.Controls className="basis-[275px] py-2">
            <AudioPlayerCompoundComponent.ControlAudio />
            <AudioPlayerCompoundComponent.ControlPrevious />
            <AudioPlayerCompoundComponent.ControlPlay />
            <AudioPlayerCompoundComponent.ControlNext />
            <AudioPlayerCompoundComponent.Time />
          </AudioPlayerCompoundComponent.Controls>
          <AudioPlayerCompoundComponent.Info className="ml-auto basis-1/3">
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
          <div className="ml-auto flex justify-end">
            <AudioPlayerCompoundComponent.Volume className="flex basis-[165px]">
              <AudioPlayerCompoundComponent.VolumeButton />
              <AudioPlayerCompoundComponent.VolumeSlider />
            </AudioPlayerCompoundComponent.Volume>
            <AudioPlayerCompoundComponent.Controls className="py-2">
              <AudioPlayerCompoundComponent.ControlShuffle className="text-2xl" />
              <AudioPlayerCompoundComponent.ControlLoop className="text-2xl" />
            </AudioPlayerCompoundComponent.Controls>
          </div>
        </div>
        <AudioPlayerCompoundComponent.ProgressBar className="before:bg-red-600" />
      </AudioPlayerCompoundComponent.Root>
    </AudioPlayerCompoundComponent.Provider>
  ),
};

export const WithCollapsiblePlaylist: StoryObj<typeof AudioPlayer> = {
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
      <AudioPlaylistCompoundComponent.Provider>
        <AudioPlayerCompoundComponent.Root className="flex flex-col">
          {/* Collapsible Playlist that appears above */}
          <AudioPlaylistCompoundComponent.ExpandableContainer>
            <AudioPlaylistCompoundComponent.Root>
              <AudioPlaylistCompoundComponent.Header>
                <span>Playlist</span>
                <AudioPlaylistCompoundComponent.Dismiss />
              </AudioPlaylistCompoundComponent.Header>
              <AudioPlaylistCompoundComponent.ScrollableContainer maxHeight="227px">
                <AudioPlaylistCompoundComponent.Tracks>
                  {trackData.map((track, index) => (
                    <AudioPlaylistCompoundComponent.Track.Provider
                      key={`${index}-${track.src}`}
                      index={index}
                      track={track}
                    >
                      <AudioPlaylistCompoundComponent.Track.Root>
                        <AudioPlaylistCompoundComponent.Track.Image />
                        <div>
                          <AudioPlaylistCompoundComponent.Track.Title />
                          <AudioPlaylistCompoundComponent.Track.Author />
                        </div>
                      </AudioPlaylistCompoundComponent.Track.Root>
                    </AudioPlaylistCompoundComponent.Track.Provider>
                  ))}
                </AudioPlaylistCompoundComponent.Tracks>
              </AudioPlaylistCompoundComponent.ScrollableContainer>
            </AudioPlaylistCompoundComponent.Root>
          </AudioPlaylistCompoundComponent.ExpandableContainer>
          <div className="flex grow justify-between gap-4">
            {/* Main Player UI */}
            <AudioPlayerCompoundComponent.Info className="basis-1/3">
              <AudioPlayerCompoundComponent.Image />
              <div className="py-2">
                <AudioPlayerCompoundComponent.Title />
                <AudioPlayerCompoundComponent.Author />
                <AudioPlayerCompoundComponent.Time />
              </div>
            </AudioPlayerCompoundComponent.Info>
            <AudioPlayerCompoundComponent.Controls>
              <AudioPlayerCompoundComponent.ControlAudio />
              <AudioPlayerCompoundComponent.ControlLoop />
              <AudioPlayerCompoundComponent.ControlPrevious />
              <AudioPlayerCompoundComponent.ControlPlay />
              <AudioPlayerCompoundComponent.ControlNext />
              <AudioPlayerCompoundComponent.ControlShuffle />
            </AudioPlayerCompoundComponent.Controls>
            <div className="flex basis-1/3 items-center justify-end gap-2 px-2">
              <AudioPlayerCompoundComponent.Volume>
                <AudioPlayerCompoundComponent.VolumeButton />
                <AudioPlayerCompoundComponent.VolumeSlider />
              </AudioPlayerCompoundComponent.Volume>
              <AudioPlaylistCompoundComponent.ControlToggle className="text-2xl" />
            </div>
          </div>
          <AudioPlayerCompoundComponent.ProgressBar />
        </AudioPlayerCompoundComponent.Root>
      </AudioPlaylistCompoundComponent.Provider>
    </AudioPlayerCompoundComponent.Provider>
  ),
};
