import clsx from 'clsx';
import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

/**
 * Props for the track title component
 */
export type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
  /** Element to render as @default p */
  as?: T;

  /**
   * Additional CSS classes to apply to the component
   * @example
   * // Apply custom classes
   * <AudioPlayerTitle className="text-2xl text-blue-500" />
   */
  className?: string;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying track title with appropriate styling
 */
export function AudioPlayerTitlePrimitive<T extends ElementType>(props: AudioPlayerTitleProps<T>) {
  const { as: Element = 'p', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('line-clamp-1 font-bold lg:max-w-64 lg:truncate', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

/**
 * Displays the title of the current audio track
 * Returns null if no title is available
 */
export function AudioPlayerTitle<T extends ElementType>(props: AudioPlayerTitleProps<T>) {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack();

  if (!title) return null;

  return (
    <AudioPlayerTitlePrimitive
      title={title}
      {...props}
    >
      {title}
    </AudioPlayerTitlePrimitive>
  );
}
