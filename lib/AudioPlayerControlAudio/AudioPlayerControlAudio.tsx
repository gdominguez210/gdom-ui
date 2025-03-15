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

export type AudioPlayerControlAudioPrimitiveProps = ComponentPropsWithRef<'audio'>;

export function AudioPlayerControlAudioPrimitive(props: AudioPlayerControlAudioPrimitiveProps) {
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

export function AudioPlayerControlAudio(props: AudioPlayerControlAudioPrimitiveProps) {
  const { onLoadedMetadata, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack();

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

  return (
    <AudioPlayerControlAudioPrimitive
      {...restProps}
      ref={audioRef}
      src={currentTrack?.src}
      onLoadedMetadata={handleMetadata}
    />
  );
}
