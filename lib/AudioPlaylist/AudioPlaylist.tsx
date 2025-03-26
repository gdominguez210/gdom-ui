import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlaylistContext } from '@lib/AudioPlaylistContextProvider';
import { AudioPlaylistHeader } from '@lib/AudioPlaylistHeader/AudioPlaylistHeader';
import { AudioPlaylistDismiss } from '@lib/AudioPlaylistDismiss/AudioPlaylistDismiss';
import { AudioPlaylistTracks } from '@lib/AudioPlaylistTracks/AudioPlaylistTracks';
import { AudioPlaylistTrack } from '@lib/AudioPlaylistTrack/AudioPlaylistTrack';
import { AudioPlaylistExpandableContainer } from '@lib/AudioPlaylistExpandableContainer/AudioPlaylistExpandableContainer';

/**
 * Props for the audio playlist primitive component
 */
export type AudioPlaylistPrimitiveProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying a playlist of audio tracks, providing the essential markup
 */
export function AudioPlaylistPrimitive<T extends ElementType = 'div'>(
  props: AudioPlaylistPrimitiveProps<T>,
) {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex flex-col border-slate-600 bg-slate-800', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

/**
 * Props for the audio playlist component
 */
export type AudioPlaylistProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
  /** Title of the playlist */
  title?: string;
} & ComponentPropsWithRef<T>;

/**
 * Displays a playlist of all available audio tracks and allows selection
 */
export function AudioPlaylist<T extends ElementType = 'div'>(props: AudioPlaylistProps<T>) {
  const { title = 'Playlist', ...restProps } = props;
  const { tracks, currentTrackIndex, setTrackIndex } = useAudioPlayerContextTrack();
  const { isPlaying, play, togglePlay } = useAudioPlayerContextAudio();
  const { isPlaylistVisible } = useAudioPlaylistContext();

  const handleTrackSelect = (index: number): void => {
    setTrackIndex(index);
    currentTrackIndex === index ? togglePlay() : play();
  };

  return (
    <AudioPlaylistExpandableContainer isExpanded={isPlaylistVisible}>
      <AudioPlaylistPrimitive {...(restProps as AudioPlaylistPrimitiveProps<T>)}>
        <AudioPlaylistHeader>
          <span>{title}</span>
          <AudioPlaylistDismiss />
        </AudioPlaylistHeader>
        <AudioPlaylistTracks className="max-h-[227px] overflow-y-auto">
          {tracks.map(({ src, title, author, thumbnail }, index) => (
            <AudioPlaylistTrack
              key={`${src}-${index}`}
              title={title}
              author={author}
              thumbnail={thumbnail}
              active={index === currentTrackIndex}
              isPlaying={isPlaying}
              onSelect={() => handleTrackSelect(index)}
            />
          ))}
        </AudioPlaylistTracks>
      </AudioPlaylistPrimitive>
    </AudioPlaylistExpandableContainer>
  );
}
