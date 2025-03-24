import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  type RefObject,
  useCallback,
} from 'react';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerPreviousTrack } from './useAudioPlayerPreviousTrack';
import { Icon } from '@lib/Icon/Icon';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
/**
 * Base button component for previous track navigation
 */
export function AudioPlayerControlPreviousPrimitive(props: AudioPlayerControlPreviousProps) {
  return (
    <AudioPlayerControlButton
      aria-label="Previous Track"
      {...props}
    >
      <Icon
        name="rewind-start-fill"
        className="scale-90"
      />
    </AudioPlayerControlButton>
  );
}

/**
 * Props for the previous track control button
 */
export type AudioPlayerControlPreviousProps = ComponentPropsWithRef<'button'>;

/**
 * Previous track control button that integrates with the audio player context
 */
export function AudioPlayerControlPrevious(props: AudioPlayerControlPreviousProps) {
  const { onClick, ...restProps } = props;
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();

  const { handlePreviousTrack } = useAudioPlayerPreviousTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef: audioRef as RefObject<HTMLAudioElement>,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      handlePreviousTrack();
      onClick?.(e);
    },
    [handlePreviousTrack, onClick],
  );

  return (
    <AudioPlayerControlPreviousPrimitive
      onClick={handleClick}
      {...restProps}
    />
  );
}
