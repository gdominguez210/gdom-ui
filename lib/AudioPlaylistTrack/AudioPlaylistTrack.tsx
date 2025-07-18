import { AudioPlaylistTrackContainer } from '@/lib/AudioPlaylistTrackContainer/AudioPlaylistTrackContainer';
import { AudioPlaylistTrackContextProvider } from '@/lib/AudioPlaylistTrackContextProvider';
import { AudioPlaylistTrackImage } from '@/lib/AudioPlaylistTrackImage';
import { AudioPlaylistTrackTitle } from '@/lib/AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '@/lib/AudioPlaylistTrackAuthor';

export const AudioPlaylistTrack = {
  Provider: Object.assign(AudioPlaylistTrackContextProvider, {
    displayName: 'AudioPlaylistTrack.Provider',
  }),
  Container: Object.assign(AudioPlaylistTrackContainer, {
    displayName: 'AudioPlaylistTrack.Container',
  }),
  Image: Object.assign(AudioPlaylistTrackImage, {
    displayName: 'AudioPlaylistTrack.Image',
  }),
  Title: Object.assign(AudioPlaylistTrackTitle, {
    displayName: 'AudioPlaylistTrack.Title',
  }),
  Author: Object.assign(AudioPlaylistTrackAuthor, {
    displayName: 'AudioPlaylistTrack.Author',
  }),
};
