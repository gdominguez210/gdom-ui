import type { Meta, StoryObj } from '@storybook/react-vite';
import { AudioPlayer } from '@/lib/AudioPlayer/AudioPlayer';
import { AudioPlayerContainer } from '@/lib/AudioPlayerContainer/AudioPlayerContainer';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlayerControlPlay } from '@/lib/AudioPlayerControlPlay/AudioPlayerControlPlay';
import { AudioPlayerControlNext } from '@/lib/AudioPlayerControlNext/AudioPlayerControlNext';
import { AudioPlayerControlPrevious } from '@/lib/AudioPlayerControlPrevious/AudioPlayerControlPrevious';
import { AudioPlayerControlShuffle } from '@/lib/AudioPlayerControlShuffle/AudioPlayerControlShuffle';
import { AudioPlayerControlLoop } from '@/lib/AudioPlayerControlLoop/AudioPlayerControlLoop';
import { AudioPlayerControlAudio } from '@/lib/AudioPlayerControlAudio/AudioPlayerControlAudio';
import { AudioPlayerVolumeSlider } from '@/lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';
import { AudioPlayerVolumeButton } from '@/lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerProgressBar } from '@/lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@/lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '@/lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerAuthor } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerImage } from '@/lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '@/lib/AudioPlayerInfo/AudioPlayerInfo';
import { AudioPlayerControls } from '@/lib/AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerVolume } from '@/lib/AudioPlayerVolume/AudioPlayerVolume';
import { AudioPlayerContextPlaybackProvider } from '@/lib/AudioPlayerContextPlaybackProvider/AudioPlayerContextPlaybackProvider';
import { AudioPlayerContextTimeProvider } from '@/lib/AudioPlayerContextTimeProvider/AudioPlayerContextTimeProvider';
import { AudioPlayerContextRefsProvider } from '@/lib/AudioPlayerContextRefsProvider/AudioPlayerContextRefsProvider';
import { AudioPlayerContextTrackProvider } from '@/lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrackProvider';
import { AudioPlaylist } from '@/lib/AudioPlaylist/AudioPlaylist';
import { AudioPlayerContextAudioProvider } from '@/lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';
import { AudioPlayerVisualizerWaveform } from '@/lib/AudioPlayerVisualizerWaveform/AudioPlayerVisualizerWaveform';
import {
  AudioPlayerProgressWaveform,
  type AudioPlayerProgressWaveformProps,
} from '@/lib/AudioPlayerProgressWaveform/AudioPlayerProgressWaveform';
import { overViewData } from '@/data/peakOverviewData';
import { trackData } from '@/data/trackData';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

function AudioPlayerProgressWaveformWithAmplitudeData(
  props: Omit<AudioPlayerProgressWaveformProps, 'data'>,
) {
  const { currentTrack } = useAudioPlayerContextTrack();
  const currentTrackAmplitudeData = overViewData[currentTrack?.id ?? ''] || [];

  return (
    <AudioPlayerProgressWaveform
      {...props}
      data={currentTrackAmplitudeData}
    />
  );
}

AudioPlayerProgressWaveformWithAmplitudeData.displayName = 'AudioPlayer.ProgressWaveform';

export default {
  title: 'components/AudioPlayer',
  component: AudioPlayer.Container,
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
    AudioPlayerContainer,
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
    AudioPlayerContextPlaybackProvider,
    AudioPlayerContextTimeProvider,
    AudioPlayerContextTrackProvider,
    AudioPlayerContextRefsProvider,
    AudioPlayerContextAudioProvider,
    AudioPlayerVisualizerWaveform,
    AudioPlayerProgressWaveform,
  },
} as Meta<typeof AudioPlayer>;

export const Base: StoryObj<typeof AudioPlayer> = {
  parameters: {
    docs: {
      description: {
        story: 'A base layout set audio player components',
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
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.Container className="@container/audio-player">
        <div className="justify-space-between grow gap-4 @min-lg/audio-player:flex">
          <AudioPlayer.Info className="basis-1/3">
            <AudioPlayer.Image />
            <div className="p-2 @min-lg/audio-player:py-2">
              <AudioPlayer.Title />
              <AudioPlayer.Author />
              <AudioPlayer.Time />
            </div>
          </AudioPlayer.Info>
          <AudioPlayer.Controls className="basis-2/3 @min-lg/audio-player:gap-1 @min-lg/audio-player:text-2xl">
            <AudioPlayer.ControlAudio />
            <AudioPlayer.ControlLoop className="hidden @min-lg/audio-player:block" />
            <AudioPlayer.ControlPrevious />
            <AudioPlayer.ControlPlay />
            <AudioPlayer.ControlNext />
            <AudioPlayer.ControlShuffle className="hidden @min-lg/audio-player:block" />
            <AudioPlayer.Volume className="ml-auto pr-4">
              <AudioPlayer.VolumeButton />
              <AudioPlayer.VolumeSlider />
            </AudioPlayer.Volume>
          </AudioPlayer.Controls>
        </div>
        <AudioPlayer.ProgressBar />
      </AudioPlayer.Container>
    </AudioPlayer.Provider>
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
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.Container>
        <div className="flex grow items-center justify-between gap-4">
          <AudioPlayer.Controls className="basis-[275px] py-2">
            <AudioPlayer.ControlAudio />
            <AudioPlayer.ControlPrevious />
            <AudioPlayer.ControlPlay />
            <AudioPlayer.ControlNext />
            <AudioPlayer.Time />
          </AudioPlayer.Controls>
          <AudioPlayer.Info className="ml-auto basis-1/3">
            <AudioPlayer.Image
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <div className="py-2">
              <AudioPlayer.Title />
              <AudioPlayer.Author />
            </div>
          </AudioPlayer.Info>
          <div className="ml-auto flex justify-end">
            <AudioPlayer.Volume className="flex basis-[165px]">
              <AudioPlayer.VolumeButton />
              <AudioPlayer.VolumeSlider />
            </AudioPlayer.Volume>
            <AudioPlayer.Controls className="py-2">
              <AudioPlayer.ControlShuffle className="text-2xl" />
              <AudioPlayer.ControlLoop className="text-2xl" />
            </AudioPlayer.Controls>
          </div>
        </div>
        <AudioPlayer.ProgressBar className="before:bg-red-600" />
      </AudioPlayer.Container>
    </AudioPlayer.Provider>
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
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlaylist.Provider>
        <AudioPlayer.Container className="flex flex-col">
          {/* Collapsible Playlist that appears above */}
          <AudioPlaylist.ExpandableContainer>
            <AudioPlaylist.Container>
              <AudioPlaylist.Header>
                <span>Playlist</span>
                <AudioPlaylist.Dismiss />
              </AudioPlaylist.Header>
              <AudioPlaylist.ScrollableContainer maxHeight="227px">
                <AudioPlaylist.Tracks>
                  {trackData.map((track, index) => (
                    <AudioPlaylist.Track.Provider
                      key={`${index}-${track.src}`}
                      index={index}
                      track={track}
                    >
                      <AudioPlaylist.Track.Container>
                        <AudioPlaylist.Track.Image />
                        <div>
                          <AudioPlaylist.Track.Title />
                          <AudioPlaylist.Track.Author />
                        </div>
                      </AudioPlaylist.Track.Container>
                    </AudioPlaylist.Track.Provider>
                  ))}
                </AudioPlaylist.Tracks>
              </AudioPlaylist.ScrollableContainer>
            </AudioPlaylist.Container>
          </AudioPlaylist.ExpandableContainer>
          <div className="flex grow justify-between gap-4">
            {/* Main Player UI */}
            <AudioPlayer.Info className="basis-1/3">
              <AudioPlayer.Image />
              <div className="py-2">
                <AudioPlayer.Title />
                <AudioPlayer.Author />
                <AudioPlayer.Time />
              </div>
            </AudioPlayer.Info>
            <AudioPlayer.Controls>
              <AudioPlayer.ControlAudio />
              <AudioPlayer.ControlLoop />
              <AudioPlayer.ControlPrevious />
              <AudioPlayer.ControlPlay />
              <AudioPlayer.ControlNext />
              <AudioPlayer.ControlShuffle />
            </AudioPlayer.Controls>
            <div className="flex basis-1/3 items-center justify-end gap-2 px-2">
              <AudioPlayer.Volume>
                <AudioPlayer.VolumeButton />
                <AudioPlayer.VolumeSlider />
              </AudioPlayer.Volume>
              <AudioPlaylist.ControlToggle className="text-2xl" />
            </div>
          </div>
          <AudioPlayer.ProgressBar />
        </AudioPlayer.Container>
      </AudioPlaylist.Provider>
    </AudioPlayer.Provider>
  ),
};

export const WithFrequencyBarsVisualizer: StoryObj<typeof AudioPlayer> = {
  parameters: {
    docs: {
      description: {
        story:
          'A player with a frequency bars visualizer. See the [AudioVisualizerFrequencyBars](/docs/components-audiovisualizerfrequencybars--docs) component for more customization options.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.AudioContextProvider>
        <AudioPlayer.Container className="@container/audio-player">
          <AudioPlayer.VisualizerFrequencyBars
            className="max-h-[150px]"
            barColor="rgb(2, 156, 253)"
            colorMode="intensity"
          />
          <div className="justify-space-between grow gap-4 @min-lg/audio-player:flex">
            <AudioPlayer.Info className="basis-1/3">
              <AudioPlayer.Image />
              <div className="p-2 @min-lg/audio-player:py-2">
                <AudioPlayer.Title />
                <AudioPlayer.Author />
                <AudioPlayer.Time />
              </div>
            </AudioPlayer.Info>
            <AudioPlayer.Controls className="basis-2/3 @min-lg/audio-player:gap-1 @min-lg/audio-player:text-2xl">
              <AudioPlayer.ControlAudio />
              <AudioPlayer.ControlLoop className="hidden @min-lg/audio-player:block" />
              <AudioPlayer.ControlPrevious />
              <AudioPlayer.ControlPlay />
              <AudioPlayer.ControlNext />
              <AudioPlayer.ControlShuffle className="hidden @min-lg/audio-player:block" />
              <AudioPlayer.Volume className="ml-auto pr-4">
                <AudioPlayer.VolumeButton />
                <AudioPlayer.VolumeSlider />
              </AudioPlayer.Volume>
            </AudioPlayer.Controls>
          </div>
          <AudioPlayer.ProgressBar />
        </AudioPlayer.Container>
      </AudioPlayer.AudioContextProvider>
    </AudioPlayer.Provider>
  ),
};

export const WithWaveformVisualizer: StoryObj<typeof AudioPlayer> = {
  parameters: {
    docs: {
      description: {
        story:
          'A player with a waveform visualizer. See the [AudioVisualizerWaveform](/docs/components-audiovisualizerwaveform--docs) component for more customization options.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.AudioContextProvider>
        <AudioPlayer.Container className="@container/audio-player">
          <AudioPlayer.VisualizerWaveform
            className="max-h-[150px]"
            lineColor="rgb(2, 156, 253)"
            colorMode="amplitude"
          />
          <div className="justify-space-between grow gap-4 @min-lg/audio-player:flex">
            <AudioPlayer.Info className="basis-1/3">
              <AudioPlayer.Image />
              <div className="p-2 @min-lg/audio-player:py-2">
                <AudioPlayer.Title />
                <AudioPlayer.Author />
                <AudioPlayer.Time />
              </div>
            </AudioPlayer.Info>
            <AudioPlayer.Controls className="basis-2/3 @min-lg/audio-player:gap-1 @min-lg/audio-player:text-2xl">
              <AudioPlayer.ControlAudio />
              <AudioPlayer.ControlLoop className="hidden @min-lg/audio-player:block" />
              <AudioPlayer.ControlPrevious />
              <AudioPlayer.ControlPlay />
              <AudioPlayer.ControlNext />
              <AudioPlayer.ControlShuffle className="hidden @min-lg/audio-player:block" />
              <AudioPlayer.Volume className="ml-auto pr-4">
                <AudioPlayer.VolumeButton />
                <AudioPlayer.VolumeSlider />
              </AudioPlayer.Volume>
            </AudioPlayer.Controls>
          </div>
          <AudioPlayer.ProgressBar />
        </AudioPlayer.Container>
      </AudioPlayer.AudioContextProvider>
    </AudioPlayer.Provider>
  ),
};

export const WithCollapsiblePlaylistAndVisualizer: StoryObj<typeof AudioPlayer> = {
  parameters: {
    docs: {
      description: {
        story:
          'A player with a collapsible playlist that can be toggled with a button or dismissed with the close button in the header. This example also includes a spectrum-colored frequency bars visualizer - see the [AudioVisualizerFrequencyBars](/docs/components-audiovisualizerfrequencybars--docs) component for more customization options.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.AudioContextProvider>
        <AudioPlaylist.Provider>
          <AudioPlayer.Container className="flex flex-col">
            <AudioPlaylist.ExpandableContainer>
              <AudioPlaylist.Container>
                <AudioPlaylist.Header>
                  <span>Playlist</span>
                  <AudioPlaylist.Dismiss />
                </AudioPlaylist.Header>
                <AudioPlaylist.ScrollableContainer maxHeight="227px">
                  <AudioPlaylist.Tracks>
                    {trackData.map((track, index) => (
                      <AudioPlaylist.Track.Provider
                        key={`${index}-${track.src}`}
                        index={index}
                        track={track}
                      >
                        <AudioPlaylist.Track.Container>
                          <AudioPlaylist.Track.Image />
                          <div>
                            <AudioPlaylist.Track.Title />
                            <AudioPlaylist.Track.Author />
                          </div>
                        </AudioPlaylist.Track.Container>
                      </AudioPlaylist.Track.Provider>
                    ))}
                  </AudioPlaylist.Tracks>
                </AudioPlaylist.ScrollableContainer>
              </AudioPlaylist.Container>
            </AudioPlaylist.ExpandableContainer>
            <AudioPlayer.VisualizerFrequencyBars
              className="max-h-[150px]"
              barColor="rgb(2, 156, 253)"
              colorMode="spectrum"
            />
            <div className="flex grow justify-between gap-4">
              <AudioPlayer.Info className="basis-1/3">
                <AudioPlayer.Image />
                <div className="py-2">
                  <AudioPlayer.Title />
                  <AudioPlayer.Author />
                  <AudioPlayer.Time />
                </div>
              </AudioPlayer.Info>
              <AudioPlayer.Controls>
                <AudioPlayer.ControlAudio />
                <AudioPlayer.ControlLoop />
                <AudioPlayer.ControlPrevious />
                <AudioPlayer.ControlPlay />
                <AudioPlayer.ControlNext />
                <AudioPlayer.ControlShuffle />
              </AudioPlayer.Controls>
              <div className="flex basis-1/3 items-center justify-end gap-2 px-2">
                <AudioPlayer.Volume>
                  <AudioPlayer.VolumeButton />
                  <AudioPlayer.VolumeSlider />
                </AudioPlayer.Volume>
                <AudioPlaylist.ControlToggle className="text-2xl" />
              </div>
            </div>
            <AudioPlayer.ProgressBar />
          </AudioPlayer.Container>
        </AudioPlaylist.Provider>
      </AudioPlayer.AudioContextProvider>
    </AudioPlayer.Provider>
  ),
};

export const WithProgressWaveform: StoryObj<typeof AudioPlayer> = {
  parameters: {
    docs: {
      description: {
        story:
          'A player with a pre-rendered waveform visualization that shows playback progress. Users can click anywhere on the waveform to seek to that position in the track. The colored portion of the waveform represents the played section, while interactive hover effects provide visual feedback when navigating through the track. See the [AudioProgressWaveform](/docs/components-audiowaveformprogress--docs) component for more customization options.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.Container>
        <AudioPlayerProgressWaveformWithAmplitudeData
          className="h-[150px]"
          color={'#a1a1a1'}
          progressColor={'#00bcff'}
        />
        <div className="justify-space-between flex grow gap-4">
          <AudioPlayer.Info className="basis-1/3">
            <AudioPlayer.Image />
            <div className="py-2">
              <AudioPlayer.Title />
              <AudioPlayer.Author />
              <AudioPlayer.Time />
            </div>
          </AudioPlayer.Info>
          <AudioPlayer.Controls className="basis-1/3">
            <AudioPlayer.ControlAudio />
            <AudioPlayer.ControlLoop />
            <AudioPlayer.ControlPrevious />
            <AudioPlayer.ControlPlay />
            <AudioPlayer.ControlNext />
            <AudioPlayer.ControlShuffle />
          </AudioPlayer.Controls>
          <AudioPlayer.Volume className="ml-auto pr-4">
            <AudioPlayer.VolumeButton />
            <AudioPlayer.VolumeSlider />
          </AudioPlayer.Volume>
        </div>
      </AudioPlayer.Container>
    </AudioPlayer.Provider>
  ),
};
