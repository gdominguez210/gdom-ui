import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';

function useAudioPlayerMetadata({
  audioRef,
  progressBarRef,
  onDurationChange
}) {
  const handleLoadedMetadata = useCallback(() => {
    const seconds = audioRef.current?.duration;
    if (typeof seconds !== "undefined") {
      onDurationChange(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  }, [audioRef, progressBarRef, onDurationChange]);
  return { handleLoadedMetadata };
}

function AudioPlayerControlAudioPrimitive(props) {
  return /* @__PURE__ */ jsx(
    "audio",
    {
      crossOrigin: "anonymous",
      ...props
    }
  );
}

function AudioPlayerControlAudio(props) {
  const { onLoadedMetadata, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack();
  const { mute } = useAudioPlayerContextPlayback();
  const { handleLoadedMetadata } = useAudioPlayerMetadata({
    audioRef,
    progressBarRef,
    onDurationChange: setDuration
  });
  const handleMetadata = useCallback(
    (event) => {
      handleLoadedMetadata();
      onLoadedMetadata?.(event);
    },
    [handleLoadedMetadata, onLoadedMetadata]
  );
  const composedRef = useComposedRefs(audioRef, ref);
  return /* @__PURE__ */ jsx(
    AudioPlayerControlAudioPrimitive,
    {
      ...restProps,
      ref: composedRef,
      src: currentTrack?.src,
      onLoadedMetadata: handleMetadata,
      muted: mute
    }
  );
}

export { AudioPlayerControlAudio as A, AudioPlayerControlAudioPrimitive as a, useAudioPlayerMetadata as u };
