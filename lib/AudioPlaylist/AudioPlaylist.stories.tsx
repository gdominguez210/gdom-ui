import type { StoryObj, Meta } from '@storybook/react-vite';
import { AudioPlaylist } from '@/lib/AudioPlaylist/AudioPlaylist';
import { AudioPlaylistCompoundComponent } from '@/lib/AudioPlaylist/namespace';
import { AudioPlayerCompoundComponent } from '@/lib/AudioPlayer/namespace';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider';
import { AudioPlaylistTracks } from '@/lib/AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistHeader } from '@/lib/AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '@/lib/AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistControlToggle } from '@/lib/AudioPlaylistControlToggle/AudioPlaylistControlToggle';
import { AudioPlaylistExpandableContainer } from '@/lib/AudioPlaylistExpandableContainer';
import { AudioPlaylistScrollableContainer } from '@/lib/AudioPlaylistScrollableContainer';
import { AudioPlaylistTrack } from '@/lib/AudioPlaylistTrack/AudioPlaylistTrack';
import { AudioPlaylistTrackContextProvider } from '@/lib/AudioPlaylistTrackContextProvider';
import { AudioPlaylistTrackImage } from '@/lib/AudioPlaylistTrackImage';
import { AudioPlaylistTrackTitle } from '@/lib/AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '@/lib/AudioPlaylistTrackAuthor';
import { trackData } from '@/data/trackData';

const simplifiedExampleSource = `
<AudioPlayerContextProvider tracks={trackData}>
  <AudioPlaylist.Provider>
    <AudioPlaylist.Root>
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
          <AudioPlaylist.Track.Root>
            <AudioPlaylist.Track.Image />
            <div>
              <AudioPlaylist.Track.Title />
              <AudioPlaylist.Track.Author />
            </div>
          </AudioPlaylist.Track.Root>
        </AudioPlaylist.Track.Provider>
        {/* Additional tracks... */}
      </AudioPlaylist.Tracks>
    </AudioPlaylist.Root>
  </AudioPlaylist.Provider>
</AudioPlayerContextProvider>
`;

export default {
  title: 'components/AudioPlaylist',
  component: AudioPlaylist,
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
    AudioPlaylistTrack,
    AudioPlaylistTrackContextProvider,
    AudioPlaylistTrackImage,
    AudioPlaylistTrackTitle,
    AudioPlaylistTrackAuthor,
  },
} as Meta<typeof AudioPlaylist>;

export const Example: StoryObj<typeof AudioPlaylist> = {
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
      <AudioPlaylistCompoundComponent.Provider>
        <AudioPlaylistCompoundComponent.Root>
          <AudioPlaylistCompoundComponent.Header>
            <span>Playlist</span>
          </AudioPlaylistCompoundComponent.Header>
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
        </AudioPlaylistCompoundComponent.Root>
      </AudioPlaylistCompoundComponent.Provider>
    </AudioPlayerContextProvider>
  ),
};

export const WithScrollableContainer: StoryObj<typeof AudioPlaylist> = {
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
      <AudioPlaylistCompoundComponent.Provider>
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Limited height (150px) with scrolling</h3>
            <AudioPlaylistCompoundComponent.Root>
              <AudioPlaylistCompoundComponent.Header>
                <span>Playlist</span>
              </AudioPlaylistCompoundComponent.Header>
              <AudioPlaylistCompoundComponent.ScrollableContainer maxHeight="150px">
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
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Taller container (300px)</h3>
            <AudioPlaylistCompoundComponent.Root>
              <AudioPlaylistCompoundComponent.Header>
                <span>Playlist</span>
              </AudioPlaylistCompoundComponent.Header>
              <AudioPlaylistCompoundComponent.ScrollableContainer maxHeight="300px">
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
          </div>
        </div>
      </AudioPlaylistCompoundComponent.Provider>
    </AudioPlayerContextProvider>
  ),
};

export const WithExpandableContainer: StoryObj<typeof AudioPlaylist> = {
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
      <AudioPlaylistCompoundComponent.Provider>
        <div className="flex flex-col">
          <AudioPlaylistCompoundComponent.ExpandableContainer>
            <AudioPlaylistCompoundComponent.Root>
              <AudioPlaylistCompoundComponent.Header>
                <span>Playlist</span>
                <AudioPlaylistCompoundComponent.Dismiss />
              </AudioPlaylistCompoundComponent.Header>
              <AudioPlaylistCompoundComponent.ScrollableContainer maxHeight="300px">
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
          <div className="flex justify-center p-4">
            <AudioPlaylistCompoundComponent.ControlToggle className="text-2xl" />
          </div>
        </div>
      </AudioPlaylistCompoundComponent.Provider>
    </AudioPlayerContextProvider>
  ),
};

export const WithAudioPlayer: StoryObj<typeof AudioPlaylist> = {
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
