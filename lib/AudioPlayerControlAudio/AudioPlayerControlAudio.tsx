import {
  type ComponentPropsWithRef,
  type ReactEventHandler,
  type RefObject,
  useCallback,
  memo,
} from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerMetadata } from '@lib/AudioPlayerControlAudio/useAudioPlayerMetadata';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';

export type AudioPlayerControlAudioProps = ComponentPropsWithRef<'audio'>;

function AudioPlayerControlAudioPrimitive(props: AudioPlayerControlAudioProps) {
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

const AudioPlayerControlAudioPrimitiveMemo = memo(AudioPlayerControlAudioPrimitive);
AudioPlayerControlAudioPrimitiveMemo.displayName = 'AudioPlayerControlAudioPrimitive';
export { AudioPlayerControlAudioPrimitiveMemo as AudioPlayerControlAudioPrimitive };

function AudioPlayerControlAudio(props: AudioPlayerControlAudioProps) {
  const { onLoadedMetadata, ...restProps } = props;
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

  return (
    <AudioPlayerControlAudioPrimitive
      {...restProps}
      ref={audioRef}
      src={currentTrack?.src}
      onLoadedMetadata={handleMetadata}
      muted={mute}
    />
  );
}

const AudioPlayerControlAudioMemo = memo(AudioPlayerControlAudio);
AudioPlayerControlAudioMemo.displayName = 'AudioPlayerControlAudio';
export { AudioPlayerControlAudioMemo as AudioPlayerControlAudio };
