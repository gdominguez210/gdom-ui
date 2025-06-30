/**
 * Options for envelope interpolation sampling
 */
export type EnvelopeSampleOptions = {
  /**
   * Number of samples to use for interpolation window
   * @default 4
   */
  numSamples?: number;

  /**
   * Number of interpolated points per sample interval
   * @default 4
   */
  oversampleRate?: number;
};

/**
 * Envelope segment data
 */
export type EnvelopeSegment = {
  /**
   * Minimum value of the envelope segment (-1 to 1)
   */
  min: number;

  /**
   * Maximum value of the envelope segment (-1 to 1)
   */
  max: number;
};

/**
 * Interpolation function for envelope segments
 * @param data - Envelope segment data
 * @param exactIndex - Exact index of the segment
 * @returns Interpolated envelope segment
 */
export type EnvelopeSegmentInterpolationFn = (
  data: EnvelopeSegment[],
  exactIndex: number,
) => EnvelopeSegment;

/**
 * Envelope segment info for color functions
 */
export type EnvelopeSegmentInfo = {
  /**
   * Position in the waveform (0-1)
   */
  position: number;

  /**
   * Minimum value of the envelope segment (-1 to 1)
   */
  min: number;

  /**
   * Maximum value of the envelope segment (-1 to 1)
   */
  max: number;

  /**
   * Index in the segments array
   */
  index: number;

  /**
   * Width of this specific segment as a percentage of total width (0-1)
   */
  widthPercent: number;

  /**
   * Width of this specific segment in pixels
   */
  widthPixels: number;

  /**
   * Amplitude range of the segment (Math.abs(max - min))
   * Represents the dynamic range between min and max values.
   * Range: 0-2 (where 0 = no amplitude difference, 2 = full range from -1 to +1)
   */
  amplitudeRange: number;

  /**
   * Actual rendered height in pixels
   */
  heightPixels: number;
};

/**
 * Interpolation function for raw audio data
 * @param data - Raw audio data
 * @param exactIndex - Exact index of the segment
 * @param options - Options for interpolation
 * @returns Interpolated envelope segment
 */
export type RawAudioInterpolationForEnvelopesFn = (
  data: number[] | Float32Array,
  exactIndex: number,
  options?: EnvelopeSampleOptions,
) => EnvelopeSegment;

/**
 * Processed audio envelope data
 * @param data - Envelope segment data
 * @param metadata - Metadata about the audio data
 */
export type ProcessedAudioEnvelopeData = {
  data: EnvelopeSegment[];
  metadata: {
    sourceFile: string;
    sampleRate: number;
    duration: number;
    channels: number;
    resolution: number;
    normalized: boolean;
    generatedAt: string;
    originalLength: number;
  };
};

/**
 * Audio data from the Web Audio API, or a pre-processed envelope segment array.
 * Number and Float32Array should be in the range from -1 to 1.
 */
export type AudioData = number[] | Float32Array | EnvelopeSegment[];

/**
 * Transform function for each envelope segment
 * @param envelope - Envelope segment
 * @returns Transformed envelope segment
 */
export type SampleWindowTransformFn<TResult> = (envelope: EnvelopeSegment) => TResult;
