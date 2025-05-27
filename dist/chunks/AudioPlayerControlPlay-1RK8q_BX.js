import { jsx } from 'react/jsx-runtime';
import { useEffect, useCallback } from 'react';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { A as AudioPlayerControlPlayPrimitive } from './AudioPlayerControlPlayPrimitive-DSJ_XWlK.js';

function useAudioPlayerControlPlay(props) {
  const { isPlaying, audioRef, currentTrackIndex } = props;
  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [audioRef, isPlaying, currentTrackIndex]);
}

function AudioPlayerControlPlay(props) {
  const { onClick, ...restProps } = props;
  const { isPlaying, togglePlay } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();
  const { currentTrackIndex } = useAudioPlayerContextTrack();
  useAudioPlayerControlPlay({
    isPlaying,
    audioRef,
    currentTrackIndex
  });
  const handleClick = useCallback(
    (e) => {
      togglePlay();
      onClick?.(e);
    },
    [togglePlay, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlPlayPrimitive,
    {
      active: isPlaying,
      onClick: handleClick,
      ...restProps
    }
  );
}

export { AudioPlayerControlPlay as A, useAudioPlayerControlPlay as u };
