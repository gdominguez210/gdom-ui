import type { StoryObj, Meta } from '@storybook/react-vite';
import { AudioPlaylist } from '@/lib/AudioPlaylist/AudioPlaylist';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider';
import { AudioPlaylistTracks } from '@/lib/AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistHeader } from '@/lib/AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '@/lib/AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistControlToggle } from '@/lib/AudioPlaylistControlToggle/AudioPlaylistControlToggle';
import { AudioPlaylistExpandableContainer } from '@/lib/AudioPlaylistExpandableContainer';
import { AudioPlaylistScrollableContainer } from '@/lib/AudioPlaylistScrollableContainer';
import { AudioPlaylistTrackContainer } from '@/lib/AudioPlaylistTrackContainer/AudioPlaylistTrackContainer';
import { AudioPlaylistTrackContextProvider } from '@/lib/AudioPlaylistTrackContextProvider';
import { AudioPlaylistTrackImage } from '@/lib/AudioPlaylistTrackImage';
import { AudioPlaylistTrackTitle } from '@/lib/AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '@/lib/AudioPlaylistTrackAuthor';
import { trackData } from '@/data/trackData';
import { AudioPlayer } from '@/lib/AudioPlayer/AudioPlayer';

const simplifiedExampleSource = `
<AudioPlayerContextProvider tracks={trackData}>
  <AudioPlaylist.Provider>
    <AudioPlaylist.Container>
      <AudioPlaylist.Header>
        <span>Playlist</span>
      </AudioPlaylist.Header>
      <AudioPlaylist.Tracks>
        {/* All tracks rendered here - showing one example */}
        <AudioPlaylist.Track.Provider
          key="track-example"
          index={0}
          track={trackData[0]}
        >
          <AudioPlaylist.Track.Container>
            <AudioPlaylist.Track.Image />
            <div>
              <AudioPlaylist.Track.Title />
              <AudioPlaylist.Track.Author />
            </div>
          </AudioPlaylist.Track.Container>
        </AudioPlaylist.Track.Provider>
        {/* Additional tracks... */}
      </AudioPlaylist.Tracks>
    </AudioPlaylist.Container>
  </AudioPlaylist.Provider>
</AudioPlayerContextProvider>
`;

export default {
  title: 'components/AudioPlaylist',
  component: AudioPlaylist.Container,
  tags: ['autodocs'],
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
  parameters: {
    componentSubtitle: 'A customizable audio playlist component',
  },
  subcomponents: {
    AudioPlaylistContextProvider,
    AudioPlaylistTracks,
    AudioPlaylistHeader,
    AudioPlaylistDismiss,
    AudioPlaylistControlToggle,
    AudioPlaylistExpandableContainer,
    AudioPlaylistScrollableContainer,
    AudioPlaylistTrackContainer,
    AudioPlaylistTrackContextProvider,
    AudioPlaylistTrackImage,
    AudioPlaylistTrackTitle,
    AudioPlaylistTrackAuthor,
  },
} as Meta<typeof AudioPlaylist.Container>;

export const Example: StoryObj<typeof AudioPlaylist.Container> = {
  parameters: {
    docs: {
      description: {
        story: 'A basic playlist component showing all tracks',
      },
      canvas: {
        sourceState: 'shown',
      },
      source: {
        code: simplifiedExampleSource,
      },
    },
  },
  render: () => (
    <AudioPlayerContextProvider tracks={trackData}>
      <AudioPlaylist.Provider>
        <AudioPlaylist.Container>
          <AudioPlaylist.Header>
            <span>Playlist</span>
          </AudioPlaylist.Header>
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
        </AudioPlaylist.Container>
      </AudioPlaylist.Provider>
    </AudioPlayerContextProvider>
  ),
};

export const WithScrollableContainer: StoryObj<typeof AudioPlaylist.Container> = {
  parameters: {
    docs: {
      description: {
        story: 'A playlist that uses the scrollable container with height constraints',
      },
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'hidden',
      },
    },
  },
  render: () => (
    <AudioPlayerContextProvider tracks={trackData}>
      <AudioPlaylist.Provider>
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Limited height (150px) with scrolling</h3>
            <AudioPlaylist.Container>
              <AudioPlaylist.Header>
                <span>Playlist</span>
              </AudioPlaylist.Header>
              <AudioPlaylist.ScrollableContainer maxHeight="150px">
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
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Taller container (300px)</h3>
            <AudioPlaylist.Container>
              <AudioPlaylist.Header>
                <span>Playlist</span>
              </AudioPlaylist.Header>
              <AudioPlaylist.ScrollableContainer maxHeight="300px">
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
          </div>
        </div>
      </AudioPlaylist.Provider>
    </AudioPlayerContextProvider>
  ),
};

export const WithExpandableContainer: StoryObj<typeof AudioPlaylist.Container> = {
  parameters: {
    docs: {
      description: {
        story: 'A collapsible playlist with a toggle button',
      },
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'hidden',
      },
    },
  },
  render: () => (
    <AudioPlayerContextProvider tracks={trackData}>
      <AudioPlaylist.Provider>
        <div className="flex flex-col">
          <AudioPlaylist.ExpandableContainer>
            <AudioPlaylist.Container>
              <AudioPlaylist.Header>
                <span>Playlist</span>
                <AudioPlaylist.Dismiss />
              </AudioPlaylist.Header>
              <AudioPlaylist.ScrollableContainer maxHeight="300px">
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
          <div className="flex justify-center p-4">
            <AudioPlaylist.ControlToggle className="text-2xl" />
          </div>
        </div>
      </AudioPlaylist.Provider>
    </AudioPlayerContextProvider>
  ),
};

export const WithAudioPlayer: StoryObj<typeof AudioPlaylist.Container> = {
  parameters: {
    docs: {
      description: {
        story:
          'A player with a collapsible playlist that can be toggled with a button or dismissed with the close button in the header',
      },
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'hidden',
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
