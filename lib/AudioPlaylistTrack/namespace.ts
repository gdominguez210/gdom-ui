import { AudioPlaylistTrack } from '@lib/AudioPlaylistTrack/AudioPlaylistTrack';
import { AudioPlaylistTrackContextProvider } from '@lib/AudioPlaylistTrackContextProvider';
import { AudioPlaylistTrackImage } from '@lib/AudioPlaylistTrackImage';
import { AudioPlaylistTrackTitle } from '@lib/AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '@lib/AudioPlaylistTrackAuthor';

export const AudioPlaylistTrackCompoundComponent = {
  Provider: Object.assign(AudioPlaylistTrackContextProvider, {
    displayName: 'AudioPlaylistTrack.Provider',
  }),
  Root: Object.assign(AudioPlaylistTrack, {
    displayName: 'AudioPlaylistTrack.Root',
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
