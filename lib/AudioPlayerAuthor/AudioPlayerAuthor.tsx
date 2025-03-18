import { type ComponentPropsWithRef, type ElementType, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

export type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
  /** @default p */
  as?: T;
} & ComponentPropsWithRef<T>;

function AudioPlayerAuthorPrimitive<T extends ElementType>(props: AudioPlayerAuthorProps<T>) {
  const { as: Element = 'p', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('line-clamp-1 text-sm text-gray-400', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

const AudioPlayerAuthorPrimitiveMemo = memo(AudioPlayerAuthorPrimitive);
AudioPlayerAuthorPrimitiveMemo.displayName = 'AudioPlayerAuthorPrimitive';
export { AudioPlayerAuthorPrimitiveMemo as AudioPlayerAuthorPrimitive };

function AudioPlayerAuthor<T extends ElementType>(props: AudioPlayerAuthorProps<T>) {
  const { currentTrack: { author } = {} } = useAudioPlayerContextTrack();

  if (!author) return null;

  return (
    <AudioPlayerAuthorPrimitive
      {...props}
      title={author}
    >
      {author}
    </AudioPlayerAuthorPrimitive>
  );
}

const AudioPlayerAuthorMemo = memo(AudioPlayerAuthor);
AudioPlayerAuthorMemo.displayName = 'AudioPlayerAuthor';
export { AudioPlayerAuthorMemo as AudioPlayerAuthor };
