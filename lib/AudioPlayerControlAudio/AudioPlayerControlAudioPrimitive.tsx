import { type AudioPlayerControlAudioProps } from '@lib/AudioPlayerControlAudio/AudioPlayerControlAudio';

/**
 * Props for the audio element component
 */
export type AudioPlayerControlAudioPrimitiveProps = AudioPlayerControlAudioProps;

/**
 * Base audio element component that handles audio playback
 */
export function AudioPlayerControlAudioPrimitive(props: AudioPlayerControlAudioPrimitiveProps) {
  return <audio {...props} />;
}
