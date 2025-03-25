import {
  type ComponentPropsWithRef,
  type ReactEventHandler,
  type RefObject,
  useCallback,
} from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerMetadata } from '@lib/AudioPlayerControlAudio/useAudioPlayerMetadata';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useComposedRefs } from '@lib/useComposedRefs';
/**
 * Props for the audio element component
 */
export type AudioPlayerControlAudioProps = ComponentPropsWithRef<'audio'>;

/**
 * Base audio element component that handles audio playback
 */
export function AudioPlayerControlAudioPrimitive(props: AudioPlayerControlAudioProps) {
  const { src, onLoadedMetadata, ref, ...restProps } = props;

  return (
    <audio
      ref={ref}
      src={src}
      onLoadedMetadata={onLoadedMetadata}
      {...restProps}
    />
  );
}

/**
 * Audio element that integrates with the audio player context
 */
export function AudioPlayerControlAudio(props: AudioPlayerControlAudioProps) {
  const { onLoadedMetadata, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack();
  const { mute } = useAudioPlayerContextAudio();

  const { handleLoadedMetadata } = useAudioPlayerMetadata({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    progressBarRef: progressBarRef as RefObject<HTMLInputElement>,
    onDurationChange: setDuration,
  });

  const handleMetadata: ReactEventHandler<HTMLAudioElement> = useCallback(
    (event) => {
      handleLoadedMetadata();
      onLoadedMetadata?.(event);
    },
    [handleLoadedMetadata, onLoadedMetadata],
  );

  const composedRef = useComposedRefs(audioRef, ref);

  return (
    <AudioPlayerControlAudioPrimitive
      {...restProps}
      ref={composedRef}
      src={currentTrack?.src}
      onLoadedMetadata={handleMetadata}
      muted={mute}
    />
  );
}
