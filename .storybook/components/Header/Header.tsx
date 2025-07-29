import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';
import { Title } from '@/.storybook/components/Title';
import { DocBadges } from '@/.storybook/components/DocBadges';
import { ViewSource } from '@/.storybook/components/ViewSource/ViewSource';
import { Subtitle } from '@/.storybook/components/Subtitle';
import { styled } from '@storybook/theming';
import { baseCommon } from '@/.storybook/components/Typography/config';
import { Description } from '@storybook/addon-docs/blocks';

const HeaderContainer = styled.div(baseCommon, {
  p: {
    lineHeight: '1.75',
  },
});

type HeaderProps = ComponentPropsWithRef<'div'>;

export function Header(props: HeaderProps) {
  const { children, className, ...restProps } = props;

  return (
    <HeaderContainer
      className={cn('sb-unstyled flex flex-col items-start', className)}
      {...restProps}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 self-stretch">
        <DocBadges />
        <ViewSource />
      </div>
      <div className="my-8 flex flex-col items-start">
        <Title />
        <Subtitle />
      </div>
      <Description />
    </HeaderContainer>
  );
}
