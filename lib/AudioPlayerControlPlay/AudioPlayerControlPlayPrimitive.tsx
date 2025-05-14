import { type ComponentPropsWithRef } from 'react';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
import { IconPauseLargeFill } from '@lib/IconPauseLargeFill';
import { IconPlayLargeFill } from '@lib/IconPlayLargeFill';
/**
 * Props for the play/pause button primitive component
 */
export interface AudioPlayerControlPlayPrimitiveProps extends ComponentPropsWithRef<'button'> {
  /** Whether the audio is currently playing */
  active?: boolean;
}

/**
 * Button component that toggles between play and pause icons
 */
export function AudioPlayerControlPlayPrimitive(props: AudioPlayerControlPlayPrimitiveProps) {
  const { active = false, ...restProps } = props;

  return (
    <AudioPlayerControlButton
      aria-label={active ? 'Pause' : 'Play'}
      aria-pressed={active}
      {...restProps}
    >
      {active ? <IconPauseLargeFill /> : <IconPlayLargeFill />}
    </AudioPlayerControlButton>
  );
}
