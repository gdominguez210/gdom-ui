/**
 * Color modes for the audio progress waveform
 */
export const AUDIO_PROGRESS_COLOR_MODES = {
  /**
   * Solid colors for played and unplayed regions
   */
  SOLID: 'solid',

  /**
   * Gradient effect for played regions
   */
  GRADIENT: 'gradient',
} as const;

/**
 * Color mode for the audio progress waveform, as string union
 */
export type AudioProgressColorMode =
  (typeof AUDIO_PROGRESS_COLOR_MODES)[keyof typeof AUDIO_PROGRESS_COLOR_MODES];
