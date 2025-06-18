import type { AudioData, EnvelopeSegment } from '@/types/audio';

/**
 * Type guard to check if an array contains EnvelopeSegment objects
 * @param arr - The array to check
 * @returns True if the array contains EnvelopeSegment objects, false otherwise
 */
export function isEnvelopeSegmentArray(arr: AudioData): arr is EnvelopeSegment[] {
  return (
    arr.length > 0 &&
    typeof arr[0] === 'object' &&
    arr[0] !== null &&
    'min' in arr[0] &&
    'max' in arr[0]
  );
}
