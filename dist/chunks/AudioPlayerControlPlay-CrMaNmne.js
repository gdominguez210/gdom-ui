'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const AudioPlayerControlPlayPrimitive = require('./AudioPlayerControlPlayPrimitive-jsvkMUQM.js');

function useAudioPlayerControlPlay(props) {
  const { isPlaying, audioRef, currentTrackIndex } = props;
  React.useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [audioRef, isPlaying, currentTrackIndex]);
}

function AudioPlayerControlPlay(props) {
  const { onClick, ...restProps } = props;
  const { isPlaying, togglePlay } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { currentTrackIndex } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  useAudioPlayerControlPlay({
    isPlaying,
    audioRef,
    currentTrackIndex
  });
  const handleClick = React.useCallback(
    (e) => {
      togglePlay();
      onClick?.(e);
    },
    [togglePlay, onClick]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlPlayPrimitive.AudioPlayerControlPlayPrimitive,
    {
      active: isPlaying,
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlayerControlPlay = AudioPlayerControlPlay;
exports.useAudioPlayerControlPlay = useAudioPlayerControlPlay;
