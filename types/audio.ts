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
  min: number;
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
 * Interpolation function for raw audio data
 * @param data - Raw audio data
 * @param exactIndex - Exact index of the segment
 * @param options - Options for interpolation
 * @returns Interpolated envelope segment
 */
export type RawAudioInterpolationFn = (
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
