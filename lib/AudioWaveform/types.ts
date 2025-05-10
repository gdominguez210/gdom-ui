export type WaveformGradientStop = {
  /**
   * Position of the stop (0-1)
   */
  offset: number;

  /**
   * Color of the stop as a CSS color string
   */
  color: string;
};

export type WaveformBarColorResult =
  | string
  | {
      type: 'gradient';
      stops: WaveformGradientStop[];
    };

export type WaveformBarInfo = {
  /**
   * Position in the waveform (0-1)
   */
  position: number;

  /**
   * Amplitude value (0-1)
   */
  value: number;

  /**
   * Index in the waveform data array
   */
  index: number;

  /**
   * Width of this specific bar as a percentage of total width (0-1)
   */
  width: number;
};
