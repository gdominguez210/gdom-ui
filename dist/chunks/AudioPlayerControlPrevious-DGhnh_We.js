'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const utils = require('./utils-Cf1Ag_Nr.js');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-BmFswfI-.js');
const IconRewindStartFill = require('./IconRewindStartFill-CcJ_1gOK.js');

function useAudioPlayerPreviousTrack({
  loop,
  shuffle,
  currentTrackIndex,
  tracksLength,
  onTimeChange,
  onTrackIndexChange,
  audioRef
}) {
  const handlePreviousTrack = React.useCallback(() => {
    if (audioRef?.current?.currentTime >= 1 || loop) {
      onTimeChange(0);
      audioRef.current.currentTime = 0;
      return;
    }
    if (shuffle) {
      const previousIndex2 = utils.getRandomNumber(0, tracksLength - 1, [currentTrackIndex]);
      return onTrackIndexChange(previousIndex2);
    }
    const previousIndex = utils.getNextIndex(currentTrackIndex, tracksLength, -1);
    onTrackIndexChange(previousIndex);
  }, [currentTrackIndex, loop, onTimeChange, onTrackIndexChange, tracksLength, audioRef, shuffle]);
  return {
    handlePreviousTrack
  };
}

function AudioPlayerControlPreviousPrimitive(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      "aria-label": "Previous Track",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(IconRewindStartFill.IconRewindStartFill, { className: "scale-90" })
    }
  );
}

function AudioPlayerControlPrevious(props) {
  const { onClick, ...restProps } = props;
  const { seek } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { handlePreviousTrack } = useAudioPlayerPreviousTrack({
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
      handlePreviousTrack();
      onClick?.(e);
    },
    [handlePreviousTrack, onClick]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlPreviousPrimitive,
    {
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlayerControlPrevious = AudioPlayerControlPrevious;
exports.AudioPlayerControlPreviousPrimitive = AudioPlayerControlPreviousPrimitive;
exports.useAudioPlayerPreviousTrack = useAudioPlayerPreviousTrack;
