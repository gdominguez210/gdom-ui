import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { g as getRandomNumber, a as getNextIndex } from './utils-Do8nrW_y.js';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-CsltQ7lB.js';
import { I as IconRewindStartFill } from './IconRewindStartFill-D0WVCSci.js';

function useAudioPlayerPreviousTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef
}) {
  const handlePreviousTrack = useCallback(() => {
    if (audioRef?.current?.currentTime >= 1 || loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }
    if (shuffle) {
      const previousIndex2 = getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(previousIndex2);
    }
    const previousIndex = getNextIndex(currentTrackIndex, tracksLength, -1);
    onTrackIndexChange(previousIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);
  return {
    handlePreviousTrack
  };
}

function AudioPlayerControlPreviousPrimitive(props) {
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": "Previous Track",
      ...props,
      children: /* @__PURE__ */ jsx(IconRewindStartFill, { className: "scale-90" })
    }
  );
}

function AudioPlayerControlPrevious(props) {
  const { onClick, ...restProps } = props;
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();
  const { handlePreviousTrack } = useAudioPlayerPreviousTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef
  });
  const handleClick = useCallback(
    (e) => {
      handlePreviousTrack();
      onClick?.(e);
    },
    [handlePreviousTrack, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlPreviousPrimitive,
    {
      onClick: handleClick,
      ...restProps
    }
  );
}

export { AudioPlayerControlPrevious as A, AudioPlayerControlPreviousPrimitive as a, useAudioPlayerPreviousTrack as u };
