import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider';
import { AudioPlaylist } from './AudioPlaylist';
import { AudioPlaylistTracks } from '@/lib/AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistHeader } from '@/lib/AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '@/lib/AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistControlToggle } from '@/lib/AudioPlaylistControlToggle/AudioPlaylistControlToggle';
import { AudioPlaylistExpandableContainer } from '@/lib/AudioPlaylistExpandableContainer';
import { AudioPlaylistScrollableContainer } from '@/lib/AudioPlaylistScrollableContainer';
import { AudioPlaylistTrackCompoundComponent } from '@/lib/AudioPlaylistTrack/namespace';

export const AudioPlaylistCompoundComponent = {
  Root: Object.assign(AudioPlaylist, { displayName: 'AudioPlaylist.Root' }),
  Provider: Object.assign(AudioPlaylistContextProvider, { displayName: 'AudioPlaylist.Provider' }),
  Header: Object.assign(AudioPlaylistHeader, { displayName: 'AudioPlaylist.Header' }),
  Dismiss: Object.assign(AudioPlaylistDismiss, { displayName: 'AudioPlaylist.Dismiss' }),
  Tracks: Object.assign(AudioPlaylistTracks, { displayName: 'AudioPlaylist.Tracks' }),
  ControlToggle: Object.assign(AudioPlaylistControlToggle, {
    displayName: 'AudioPlaylist.ControlToggle',
  }),
  Track: Object.assign(AudioPlaylistTrackCompoundComponent, { displayName: 'AudioPlaylist.Track' }),
  ExpandableContainer: Object.assign(AudioPlaylistExpandableContainer, {
    displayName: 'AudioPlaylist.ExpandableContainer',
  }),
  ScrollableContainer: Object.assign(AudioPlaylistScrollableContainer, {
    displayName: 'AudioPlaylist.ScrollableContainer',
  }),
};
