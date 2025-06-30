'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const utils = require('./utils-Cf1Ag_Nr.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-BmFswfI-.js');
const IconForwardEndFill = require('./IconForwardEndFill-BreZtJVL.js');

function useAudioPlayerNextTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef
}) {
  const handleNextTrack = React.useCallback(() => {
    if (loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }
    if (shuffle) {
      const nextIndex2 = utils.getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(nextIndex2);
    }
    const nextIndex = utils.getNextIndex(currentTrackIndex, tracksLength, 1);
    onTrackIndexChange(nextIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      "aria-label": "Next Track",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(IconForwardEndFill.IconForwardEndFill, { className: "scale-90" })
    }
  );
}

function AudioPlayerControlNext(props) {
  const { onClick, ...restProps } = props;
  const { audioRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { seek } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { handleNextTrack } = useAudioPlayerNextTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef
  });
  const handleClick = React.useCallback(
    (e) => {
      handleNextTrack();
      onClick?.(e);
    },
    [handleNextTrack, onClick]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlNextPrimitive,
    {
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlayerControlNext = AudioPlayerControlNext;
exports.AudioPlayerControlNextPrimitive = AudioPlayerControlNextPrimitive;
exports.useAudioPlayerNextTrack = useAudioPlayerNextTrack;
