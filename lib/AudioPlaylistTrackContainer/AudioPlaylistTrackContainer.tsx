'use client';

import {
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent,
  useCallback,
  type KeyboardEventHandler,
  type MouseEventHandler,
} from 'react';
import { AudioPlaylistTrackContainerPrimitive } from '@/lib/AudioPlaylistTrackContainer/AudioPlaylistTrackContainerPrimitive';
import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the audio playlist track component
 */
export type AudioPlaylistTrackContainerProps = PolymorphicProps<'li'>;

/**
 * Individual playlist track component
 */
const _AudioPlaylistTrackContainer = (props: AudioPlaylistTrackContainerProps) => {
  const { onClick, onKeyDown, children, ...restProps } = props;

  const {
    active,
    onSelect,
    track: { title, author },
  } = useAudioPlaylistTrackContext();

  const handleClick: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      e.preventDefault();
      onSelect();
      onClick?.(e as ReactMouseEvent<HTMLLIElement>);
    },
    [onSelect, onClick],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }

      onKeyDown?.(e as KeyboardEvent<HTMLLIElement>);
    },
    [onSelect, onKeyDown],
  );

  return (
    <AudioPlaylistTrackContainerPrimitive
      active={active}
      aria-label={`Play ${title} by ${author}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {children}
    </AudioPlaylistTrackContainerPrimitive>
  );
};

_AudioPlaylistTrackContainer.displayName = 'AudioPlaylistTrackContainer';

export const AudioPlaylistTrackContainer =
  _AudioPlaylistTrackContainer as PolymorphicComponent<'li'>;
