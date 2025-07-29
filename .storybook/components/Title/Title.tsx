import type { ComponentPropsWithRef } from 'react';
import { Typography } from '@/.storybook/components/Typography';
import { styled } from '@storybook/theming';
import { useMemo } from 'react';
import { useOfMeta } from '@/.storybook/hooks/useOfMeta';
import { cn } from '@/utils/cn';

type TitleProps = ComponentPropsWithRef<'div'>;

const StyledTitle = styled(Typography.H1)({
  margin: '0px',
});

export function Title(props: TitleProps) {
  const { children, className, ...restProps } = props;

  const {
    preparedMeta: {
      component: { displayName },
    },
  } = useOfMeta();

  const id = useMemo(() => {
    return displayName?.replace(/ /g, '-').toLowerCase();
  }, [displayName]);

  return (
    <div
      className={cn('sb-unstyled', className)}
      {...restProps}
    >
      <StyledTitle
        id={id}
        title={displayName}
      >
        {children ?? displayName}
      </StyledTitle>
    </div>
  );
}
