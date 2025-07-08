import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { A as AudioWaveformProgress } from './AudioWaveformProgress-D_EcRYxo.js';
import { useCallback } from 'react';

function AudioPlayerProgressWaveform(props) {
  const { data, onClick, ...restProps } = props;
  const { audioRef } = useAudioPlayerContextRefs();
  const { duration, seek, setPreviewTime } = useAudioPlayerContextTime();
  const { isPlaying, play } = useAudioPlayerContextPlayback();
  const handleClick = useCallback(
    (event) => {
      if (!isPlaying) {
        play();
      }
      onClick?.(event);
    },
    [onClick, isPlaying, play]
  );
  return /* @__PURE__ */ jsx(
    AudioWaveformProgress,
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

export { AudioPlayerProgressWaveform as A };
