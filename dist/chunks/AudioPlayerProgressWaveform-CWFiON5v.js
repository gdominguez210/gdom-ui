'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const AudioWaveformProgress = require('./AudioWaveformProgress-BZqjsISJ.js');
const React = require('react');

function AudioPlayerProgressWaveform(props) {
  const { data, onClick, ...restProps } = props;
  const { audioRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { duration, seek, setPreviewTime } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const { isPlaying, play } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const handleClick = React.useCallback(
    (event) => {
      if (!isPlaying) {
        play();
      }
      onClick?.(event);
    },
    [onClick, isPlaying, play]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioWaveformProgress.AudioWaveformProgress,
    {
      isActive: isPlaying,
      audioRef,
      duration,
      onProgressChange: seek,
      onPreviewTimeChange: setPreviewTime,
      data,
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlayerProgressWaveform = AudioPlayerProgressWaveform;
