import { AudioPlaylistContextProvider } from '@lib/AudioPlaylistContextProvider';
import { AudioPlaylist } from './AudioPlaylist';
import { AudioPlaylistTrackTitle } from '@lib/AudioPlaylistTrackTitle/AudioPlaylistTrackTitle';
import { AudioPlaylistTrack } from '@lib/AudioPlaylistTrack/AudioPlaylistTrack';
import { AudioPlaylistTrackAuthor } from '@lib/AudioPlaylistTrackAuthor/AudioPlaylistTrackAuthor';
import { AudioPlaylistTrackImage } from '@lib/AudioPlaylistTrackImage/AudioPlaylistTrackImage';
import { AudioPlaylistTracks } from '@lib/AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistHeader } from '@lib/AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '@lib/AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistControlToggle } from '@lib/AudioPlaylistControlToggle/AudioPlaylistControlToggle';
import { AudioPlaylistExpandableContainer } from '@lib/AudioPlaylistExpandableContainer';

export const AudioPlaylistCompoundComponent = {
  Root: Object.assign(AudioPlaylist, { displayName: 'AudioPlaylist.Root' }),
  Provider: Object.assign(AudioPlaylistContextProvider, { displayName: 'AudioPlaylist.Provider' }),
  Header: Object.assign(AudioPlaylistHeader, { displayName: 'AudioPlaylist.Header' }),
  Dismiss: Object.assign(AudioPlaylistDismiss, { displayName: 'AudioPlaylist.Dismiss' }),
  Tracks: Object.assign(AudioPlaylistTracks, { displayName: 'AudioPlaylist.Tracks' }),
  ControlToggle: Object.assign(AudioPlaylistControlToggle, {
    displayName: 'AudioPlaylist.ControlToggle',
  }),
  Track: Object.assign(AudioPlaylistTrack, { displayName: 'AudioPlaylist.Track' }),
  TrackTitle: Object.assign(AudioPlaylistTrackTitle, { displayName: 'AudioPlaylist.TrackTitle' }),
  TrackAuthor: Object.assign(AudioPlaylistTrackAuthor, {
    displayName: 'AudioPlaylist.TrackAuthor',
  }),
  TrackImage: Object.assign(AudioPlaylistTrackImage, { displayName: 'AudioPlaylist.TrackImage' }),
  ExpandableContainer: Object.assign(AudioPlaylistExpandableContainer, {
    displayName: 'AudioPlaylist.ExpandableContainer',
  }),
};
