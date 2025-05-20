export declare const AUDIO_PLAYER_CONTEXT_TIME_ERROR = "useAudioPlayerContextTime must be used within an AudioPlayerContextTimeProvider";
export interface AudioPlayerContextTimeType {
    currentTime: number;
    duration: number;
    seek: (time: number) => void;
    setDuration: (duration: number) => void;
    previewTime: number | null;
    setPreviewTime: (time: number | null) => void;
}
export declare const AudioPlayerContextTime: import('react').Context<AudioPlayerContextTimeType | null>;
