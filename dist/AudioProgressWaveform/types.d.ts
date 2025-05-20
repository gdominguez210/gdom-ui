/**
 * Color modes for the audio progress waveform
 */
export declare const AUDIO_PROGRESS_COLOR_MODES: {
    /**
     * Solid colors for played and unplayed regions
     */
    readonly SOLID: "solid";
    /**
     * Gradient effect for played regions
     */
    readonly GRADIENT: "gradient";
};
/**
 * Color mode for the audio progress waveform, as string union
 */
export type AudioProgressColorMode = (typeof AUDIO_PROGRESS_COLOR_MODES)[keyof typeof AUDIO_PROGRESS_COLOR_MODES];
