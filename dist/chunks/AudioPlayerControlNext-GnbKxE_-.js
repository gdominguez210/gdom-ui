import { jsx } from 'react/jsx-runtime';
import { useCallback, useEffect } from 'react';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { g as getRandomNumber, a as getNextIndex } from './utils-Do8nrW_y.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-CsltQ7lB.js';
import { I as IconForwardEndFill } from './IconForwardEndFill-BRo8KTy6.js';

function useAudioPlayerNextTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef
}) {
  const handleNextTrack = useCallback(() => {
    if (loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }
    if (shuffle) {
      const nextIndex2 = getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(nextIndex2);
    }
    const nextIndex = getNextIndex(currentTrackIndex, tracksLength, 1);
    onTrackIndexChange(nextIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);
  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (!currentAudioRef) return;
    const handleEnded = () => {
      if (loop) {
        currentAudioRef.play();
        return;
      }
      handleNextTrack();
    };
    currentAudioRef.addEventListener("ended", handleEnded);
    return () => {
      currentAudioRef.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, handleNextTrack, loop]);
  return {
    handleNextTrack
  };
}

function AudioPlayerControlNextPrimitive(props) {
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": "Next Track",
      ...props,
      children: /* @__PURE__ */ jsx(IconForwardEndFill, { className: "scale-90" })
    }
  );
}

function AudioPlayerControlNext(props) {
  const { onClick, ...restProps } = props;
  const { audioRef } = useAudioPlayerContextRefs();
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextPlayback();
  const { handleNextTrack } = useAudioPlayerNextTrack({
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
      handleNextTrack();
      onClick?.(e);
    },
    [handleNextTrack, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlNextPrimitive,
    {
      onClick: handleClick,
      ...restProps
    }
  );
}

export { AudioPlayerControlNext as A, AudioPlayerControlNextPrimitive as a, useAudioPlayerNextTrack as u };
