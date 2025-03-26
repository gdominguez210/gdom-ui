import { type ComponentPropsWithRef, type MouseEventHandler, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlaylistTrackTitle } from '@lib/AudioPlaylistTrackTitle';
import { AudioPlaylistTrackAuthor } from '@lib/AudioPlaylistTrackAuthor';
import { AudioPlaylistTrackImage } from '@lib/AudioPlaylistTrackImage';

/**
 * Props for the audio playlist track primitive component
 */
export type AudioPlaylistTrackPrimitiveProps<T extends ElementType = 'li'> = {
  /** Element to render as @default li */
  as?: T;
  /** Whether the track is active */
  active?: boolean;
} & ComponentPropsWithRef<T>;

export function AudioPlaylistTrackPrimitive<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackPrimitiveProps<T>,
) {
  const { active, as: Element = 'li', children, className, ...restProps } = props;

  return (
    <Element
      tabIndex={0}
      role="button"
      aria-pressed={active}
      className={twMerge(
        clsx(
          'flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors duration-200 focus-within:outline-white',
          {
            'bg-black/50': active,
            'hover:bg-black/30 focus-visible:bg-black/30': !active,
          },
          className,
        ),
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
}
/**
 * Props for the audio playlist track component
 */
export type AudioPlaylistTrackProps<T extends ElementType = 'li'> = {
  /** Element to render as @default li */
  as?: T;
  /** Title of the track */
  title: string;
  /** Author of the track */
  author: string;
  /** URL to the track thumbnail image */
  thumbnail?: string;
  /** Whether this is the active track */
  active?: boolean;
  /** Whether audio is currently playing */
  isPlaying?: boolean;
  /** Handler for track selection */
  onSelect?: () => void;
} & Omit<
  ComponentPropsWithRef<T>,
  'title' | 'author' | 'thumbnail' | 'active' | 'isPlaying' | 'onSelect'
>;

/**
 * Individual playlist track component
 */
export function AudioPlaylistTrack<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackProps<T>,
) {
  const {
    title,
    author,
    thumbnail = '',
    active = false,
    isPlaying = false,
    onSelect,
    ...restProps
  } = props;

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    onSelect?.();
  };

  return (
    <AudioPlaylistTrackPrimitive
      active={active}
      onClick={handleClick}
      aria-label={`Play ${title} by ${author}`}
      {...(restProps as AudioPlaylistTrackPrimitiveProps<T>)}
    >
      <AudioPlaylistTrackImage
        src={thumbnail}
        altText={title}
        active={active}
        isPlaying={isPlaying}
      />
      <div>
        <AudioPlaylistTrackTitle>{title}</AudioPlaylistTrackTitle>
        <AudioPlaylistTrackAuthor>{author}</AudioPlaylistTrackAuthor>
      </div>
    </AudioPlaylistTrackPrimitive>
  );
}
