import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import {
  AudioProgressWaveform,
  type AudioProgressWaveformProps,
} from '@lib/AudioProgressWaveform/AudioProgressWaveform';
import { type MouseEventHandler, type RefObject, useCallback } from 'react';

export type AudioPlayerProgressWaveformProps = Omit<
  AudioProgressWaveformProps,
  'audioRef' | 'duration' | 'onProgressChange' | 'isActive'
>;

export function AudioPlayerProgressWaveform(props: AudioPlayerProgressWaveformProps) {
  const { waveformData, onClick, ...restProps } = props;

  const { audioRef } = useAudioPlayerContextRefs();
  const { duration, seek, setPreviewTime } = useAudioPlayerContextTime();
  const { isPlaying, play } = useAudioPlayerContextPlayback();

  const handleClick: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (event) => {
      if (!isPlaying) {
        play();
      }
      onClick?.(event);
    },
    [onClick, isPlaying, play],
  );

  return (
    <AudioProgressWaveform
      isActive={isPlaying}
      audioRef={audioRef as RefObject<HTMLAudioElement>}
      duration={duration}
      onProgressChange={seek}
      onPreviewTimeChange={setPreviewTime}
      waveformData={waveformData}
      onClick={handleClick}
      {...restProps}
    />
  );
}
