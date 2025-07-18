import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider';
import { AudioPlaylistContainer } from '@/lib/AudioPlaylistContainer/AudioPlaylistContainer';
import { AudioPlaylistTracks } from '@/lib/AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistHeader } from '@/lib/AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '@/lib/AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistControlToggle } from '@/lib/AudioPlaylistControlToggle/AudioPlaylistControlToggle';
import { AudioPlaylistExpandableContainer } from '@/lib/AudioPlaylistExpandableContainer';
import { AudioPlaylistScrollableContainer } from '@/lib/AudioPlaylistScrollableContainer';
import { AudioPlaylistTrack } from '@/lib/AudioPlaylistTrack/AudioPlaylistTrack';

export const AudioPlaylist = {
  Container: Object.assign(AudioPlaylistContainer, { displayName: 'AudioPlaylist.Container' }),
  Provider: Object.assign(AudioPlaylistContextProvider, { displayName: 'AudioPlaylist.Provider' }),
  Header: Object.assign(AudioPlaylistHeader, { displayName: 'AudioPlaylist.Header' }),
  Dismiss: Object.assign(AudioPlaylistDismiss, { displayName: 'AudioPlaylist.Dismiss' }),
  Tracks: Object.assign(AudioPlaylistTracks, { displayName: 'AudioPlaylist.Tracks' }),
  ControlToggle: Object.assign(AudioPlaylistControlToggle, {
    displayName: 'AudioPlaylist.ControlToggle',
  }),
  Track: Object.assign(AudioPlaylistTrack, { displayName: 'AudioPlaylist.Track' }),
  ExpandableContainer: Object.assign(AudioPlaylistExpandableContainer, {
    displayName: 'AudioPlaylist.ExpandableContainer',
  }),
  ScrollableContainer: Object.assign(AudioPlaylistScrollableContainer, {
    displayName: 'AudioPlaylist.ScrollableContainer',
  }),
};
