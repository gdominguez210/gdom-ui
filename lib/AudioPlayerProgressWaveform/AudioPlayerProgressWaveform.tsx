import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextRefs } from '@/lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTime } from '@/lib/AudioPlayerContextTimeProvider';
import {
  AudioWaveformProgress,
  type AudioWaveformProgressProps,
} from '@/lib/AudioWaveformProgress/AudioWaveformProgress';
import { type MouseEventHandler, type RefObject, useCallback } from 'react';

export type AudioPlayerProgressWaveformProps = Omit<
  AudioWaveformProgressProps,
  'audioRef' | 'duration' | 'onProgressChange' | 'isActive'
>;

export function AudioPlayerProgressWaveform(props: AudioPlayerProgressWaveformProps) {
  const { data, onClick, ...restProps } = props;

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
    <AudioWaveformProgress
      isActive={isPlaying}
      audioRef={audioRef as RefObject<HTMLAudioElement>}
      duration={duration}
      onProgressChange={seek}
      onPreviewTimeChange={setPreviewTime}
      data={data}
      onClick={handleClick}
      {...restProps}
    />
  );
}
