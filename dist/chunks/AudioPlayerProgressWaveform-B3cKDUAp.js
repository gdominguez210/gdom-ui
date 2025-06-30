import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { A as AudioProgressWaveform } from './AudioProgressWaveform-DWarh0BX.js';
import { useCallback } from 'react';

function AudioPlayerProgressWaveform(props) {
  const { amplitudeData, onClick, ...restProps } = props;
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
    AudioProgressWaveform,
    {
      isActive: isPlaying,
      audioRef,
      duration,
      onProgressChange: seek,
      onPreviewTimeChange: setPreviewTime,
      amplitudeData,
      onClick: handleClick,
      ...restProps
    }
  );
}

export { AudioPlayerProgressWaveform as A };
