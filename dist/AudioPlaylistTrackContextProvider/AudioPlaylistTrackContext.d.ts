import { AudioTrackData } from '../AudioPlayerContextTrackProvider/reducer';
export declare const AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR = "useAudioPlaylistTrackContext must be used within an AudioPlaylistTrackContextProvider";
export interface AudioPlaylistTrackContextType {
    active: boolean;
    isPlaying: boolean;
    track: AudioTrackData;
    onSelect: () => void;
}
export declare const AudioPlaylistTrackContext: import('react').Context<AudioPlaylistTrackContextType | null>;
