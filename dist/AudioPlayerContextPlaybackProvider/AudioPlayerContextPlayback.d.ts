export declare const AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR = "useAudioPlayerContextPlayback must be used within an AudioPlayerContextPlaybackProvider";
export interface AudioPlayerContextPlaybackType {
    isPlaying: boolean;
    volume: number;
    mute: boolean;
    shuffle: boolean;
    loop: boolean;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    setMute: (mute: boolean) => void;
    toggleMute: () => void;
    setShuffle: (shuffle: boolean) => void;
    toggleShuffle: () => void;
    setLoop: (loop: boolean) => void;
    toggleLoop: () => void;
}
export declare const AudioPlayerContextPlayback: import('react').Context<AudioPlayerContextPlaybackType | null>;
