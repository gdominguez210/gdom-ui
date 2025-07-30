import { Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { ComponentProps } from 'react';
import { Typography } from '@/.storybook/components/Typography';
import { styled } from '@storybook/theming';
import { cn } from '@/utils/cn';
import { useOfMeta } from 'hooks/useOfMeta';

const StyledApiReferenceHeader = styled(Typography.H2)({
  border: 'none',
  padding: '0px',
  marginBottom: '1rem',
});

export type ApiReferenceProps = ComponentProps<typeof Controls> & {
  className?: string;
};

export function ApiReference(props: ApiReferenceProps) {
  const { className, ...restProps } = props;

  const { preparedMeta } = useOfMeta();

  if (preparedMeta.parameters?.['docs']?.api?.disabled) {
    return null;
  }

  return (
    <div className={cn('sb-unstyled api-reference', className)}>
      <StyledApiReferenceHeader as="div">
        <Markdown>## API Reference</Markdown>
      </StyledApiReferenceHeader>
      <Controls {...restProps} />
    </div>
  );
}
