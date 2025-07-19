import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorPrimitiveProps = PolymorphicProps<'span'>;

/**
 * Track author component specifically styled for playlist tracks
 */
const _AudioPlaylistTrackAuthorPrimitive = (props: AudioPlaylistTrackAuthorPrimitiveProps) => {
  const { as: Element = 'span', className, children, ...restProps } = props;

  return (
    <Element
      className={cn('text-xs', className)}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistTrackAuthorPrimitive.displayName = 'AudioPlaylistTrackAuthorPrimitive';

export const AudioPlaylistTrackAuthorPrimitive =
  _AudioPlaylistTrackAuthorPrimitive as PolymorphicComponent<'span'>;
