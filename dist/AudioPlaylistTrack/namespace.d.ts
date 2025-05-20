import { AudioPlaylistTrack } from './AudioPlaylistTrack';
import { AudioPlaylistTrackContextProvider } from '../AudioPlaylistTrackContextProvider';
import { AudioPlaylistTrackImage } from '../AudioPlaylistTrackImage';
import { AudioPlaylistTrackTitle } from '../AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '../AudioPlaylistTrackAuthor';
export declare const AudioPlaylistTrackCompoundComponent: {
    Provider: typeof AudioPlaylistTrackContextProvider & {
        displayName: string;
    };
    Root: typeof AudioPlaylistTrack & {
        displayName: string;
    };
    Image: typeof AudioPlaylistTrackImage & {
        displayName: string;
    };
    Title: typeof AudioPlaylistTrackTitle & {
        displayName: string;
    };
    Author: typeof AudioPlaylistTrackAuthor & {
        displayName: string;
    };
};
