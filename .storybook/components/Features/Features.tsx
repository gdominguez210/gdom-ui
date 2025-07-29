import { useOfMeta } from '@/.storybook/hooks/useOfMeta';
import type { ComponentPropsWithRef, ReactNode, FC } from 'react';
import { IconLibrary, type IconLibraryProps } from '@/lib/IconLibrary';
import { cn } from '@/utils/cn';
import { Markdown } from '@storybook/addon-docs/blocks';
import { styled } from '@storybook/theming';
import { baseCommon } from '@/.storybook/components/Typography/config';
import { Typography } from '@/.storybook/components/Typography';

export type FeatureItemEntity =
  | {
      title: ReactNode;
      description: ReactNode;
      icon?: IconLibraryProps['name'];
    }
  | FC;

const StyledList = styled.ul(baseCommon);
const StyledHeader = styled(Typography.H2)({
  border: 'none',
  padding: '0px',
  marginBottom: '1rem',
});

export function Features() {
  const {
    csfFile: {
      meta: { parameters },
    },
  } = useOfMeta();

  const features = parameters?.['docs']?.features;

  if (!features?.items?.length) return null;

  return (
    <div className="sb-unstyled text-base/[1.75]">
      <StyledHeader as="div">
        <Markdown>## Features</Markdown>
      </StyledHeader>
      <StyledList className="flex list-disc flex-col gap-2 pl-[1.875rem]">
        {features.items.map((item: FeatureItemEntity, index: number) => {
          if (typeof item === 'function') {
            return item({});
          }

          const { title, description, icon } = item;

          return (
            <FeatureItem key={index}>
              {icon && <FeatureItemIcon name={icon} />}
              <FeatureItemTitle>{title}</FeatureItemTitle> - {description}
            </FeatureItem>
          );
        })}
      </StyledList>
    </div>
  );
}

export type FeatureItemProps = ComponentPropsWithRef<'li'>;

export function FeatureItem(props: FeatureItemProps) {
  const { children, className, ...rest } = props;

  return (
    <li
      className={cn(className)}
      {...rest}
    >
      {children}
    </li>
  );
}

export type FeatureItemIconProps = ComponentPropsWithRef<'span'> & Pick<IconLibraryProps, 'name'>;

export function FeatureItemIcon(props: FeatureItemIconProps) {
  const { className, name, ...rest } = props;

  return (
    <span
      className={cn(className)}
      {...rest}
    >
      <IconLibrary name={name} />
    </span>
  );
}

export type FeatureItemTitleProps = ComponentPropsWithRef<'span'>;

export function FeatureItemTitle(props: FeatureItemTitleProps) {
  const { children, className, ...rest } = props;

  return (
    <span
      className={cn(className, 'font-bold')}
      {...rest}
    >
      {children}
    </span>
  );
}
