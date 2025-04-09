'use client';

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
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider';
import { useComposedRefs } from '@lib/useComposedRefs';
import { AudioPlayerControlAudioPrimitive } from './AudioPlayerControlAudioPrimitive';

/**
 * Props for the audio element component
 */
export type AudioPlayerControlAudioProps = ComponentPropsWithRef<'audio'>;

/**
 * Audio element that integrates with the audio player context
 */
export function AudioPlayerControlAudio(props: AudioPlayerControlAudioProps) {
  const { onLoadedMetadata, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack();
  const { mute } = useAudioPlayerContextPlayback();

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
