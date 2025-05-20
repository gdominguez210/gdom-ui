'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');

function useAudioPlayerMetadata({
  audioRef,
  progressBarRef,
  onDurationChange
}) {
  const handleLoadedMetadata = React.useCallback(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "audio",
    {
      crossOrigin: "anonymous",
      ...props
    }
  );
}

function AudioPlayerControlAudio(props) {
  const { onLoadedMetadata, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  const { mute } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { handleLoadedMetadata } = useAudioPlayerMetadata({
    audioRef,
    progressBarRef,
    onDurationChange: setDuration
  });
  const handleMetadata = React.useCallback(
    (event) => {
      handleLoadedMetadata();
      onLoadedMetadata?.(event);
    },
    [handleLoadedMetadata, onLoadedMetadata]
  );
  const composedRef = useComposedRefs.useComposedRefs(audioRef, ref);
  return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.AudioPlayerControlAudio = AudioPlayerControlAudio;
exports.AudioPlayerControlAudioPrimitive = AudioPlayerControlAudioPrimitive;
exports.useAudioPlayerMetadata = useAudioPlayerMetadata;
