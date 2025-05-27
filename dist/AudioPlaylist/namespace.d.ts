import { AudioPlaylistContextProvider } from '../AudioPlaylistContextProvider';
import { AudioPlaylist } from './AudioPlaylist';
import { AudioPlaylistTracks } from '../AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistHeader } from '../AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '../AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistControlToggle } from '../AudioPlaylistControlToggle/AudioPlaylistControlToggle';
import { AudioPlaylistExpandableContainer } from '../AudioPlaylistExpandableContainer';
import { AudioPlaylistScrollableContainer } from '../AudioPlaylistScrollableContainer';
export declare const AudioPlaylistCompoundComponent: {
    Root: typeof AudioPlaylist & {
        displayName: string;
    };
    Provider: typeof AudioPlaylistContextProvider & {
        displayName: string;
    };
    Header: typeof AudioPlaylistHeader & {
        displayName: string;
    };
    Dismiss: typeof AudioPlaylistDismiss & {
        displayName: string;
    };
    Tracks: typeof AudioPlaylistTracks & {
        displayName: string;
    };
    ControlToggle: typeof AudioPlaylistControlToggle & {
        displayName: string;
    };
    Track: {
        Provider: typeof import('../AudioPlaylistTrackContextProvider').AudioPlaylistTrackContextProvider & {
            displayName: string;
        };
        Root: typeof import('..').AudioPlaylistTrack & {
            displayName: string;
        };
        Image: typeof import('..').AudioPlaylistTrackImage & {
            displayName: string;
        };
        Title: typeof import('..').AudioPlaylistTrackTitle & {
            displayName: string;
        };
        Author: typeof import('..').AudioPlaylistTrackAuthor & {
            displayName: string;
        };
    } & {
        displayName: string;
    };
    ExpandableContainer: typeof AudioPlaylistExpandableContainer & {
        displayName: string;
    };
    ScrollableContainer: typeof AudioPlaylistScrollableContainer & {
        displayName: string;
    };
};
