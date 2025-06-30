export type WaveformGradientStop = {
  offset: number;
  color: string;
};

export type WaveformColorResult =
  | string
  | {
      type: 'gradient';
      stops: WaveformGradientStop[];
    };

export type BaseAudioWaveformOptions = {
  /**
   * Waveform data array - normalized values between 0-1
   */
  waveformData: number[];

  /**
   * Height scale factor for the waveform
   */
  heightScale?: number;

  /**
   * Color of the waveform
   */
  color?: string;
};
