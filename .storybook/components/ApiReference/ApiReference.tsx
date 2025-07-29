import { Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { ComponentProps } from 'react';
import { Typography } from '@/.storybook/components/Typography';
import { styled } from '@storybook/theming';
import { cn } from '@/utils/cn';

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

  return (
    <div className={cn('sb-unstyled api-reference', className)}>
      <StyledApiReferenceHeader as="div">
        <Markdown>## API Reference</Markdown>
      </StyledApiReferenceHeader>
      <Controls {...restProps} />
    </div>
  );
}
