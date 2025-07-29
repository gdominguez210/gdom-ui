import type { ComponentPropsWithRef } from 'react';
import { styled } from 'storybook/theming';
import { withReset } from '@/.storybook/components/Typography/config';
import { cn } from '@/utils/cn';
import { useOfMeta } from '@/.storybook/hooks/useOfMeta';

const DocumentationSubtitleContainer = styled.div(withReset, {
  margin: '0px',
  fontSize: 'var(--text-lg)',
});

type SubtitleProps = ComponentPropsWithRef<'div'>;

export function Subtitle(props: SubtitleProps) {
  const { children, className, ...restProps } = props;

  const {
    csfFile: {
      meta: { parameters },
    },
  } = useOfMeta();

  const subtitle = children ?? parameters?.['docs']?.subtitle;

  return subtitle ? (
    <DocumentationSubtitleContainer
      {...restProps}
      className={cn('text-neutral-500', className)}
    >
      {subtitle}
    </DocumentationSubtitleContainer>
  ) : null;
}
