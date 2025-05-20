import { AudioTrackData } from './reducer';
export declare const AUDIO_PLAYER_CONTEXT_TRACK_ERROR = "useAudioPlayerContextTrack must be used within an AudioPlayerContextTrackProvider";
export interface AudioPlayerContextTrackType {
    currentTrack: AudioTrackData | undefined;
    currentTrackIndex: number;
    tracks: AudioTrackData[];
    setTrackIndex: (index: number) => void;
}
export declare const AudioPlayerContextTrack: import('react').Context<AudioPlayerContextTrackType | null>;
