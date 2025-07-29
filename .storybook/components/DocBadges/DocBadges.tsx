import { Badge } from '@/lib/Badge/Badge';
import { styled } from '@storybook/theming';
import { withReset } from 'storybook/internal/components';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';
import { useOfMeta } from '@/.storybook/hooks/useOfMeta';

/**
 * Doc Badge Color Guidelines
 *
 * PRIMARY (Blue) - Core Architectural Features
 * - Use for fundamental component capabilities that define what the component IS
 * - Examples: 'Polymorphic', 'Compound Component', 'Animated'
 *
 * SUCCESS (Green) - Available Features
 * - Use for additional functionality or alternatives that are AVAILABLE
 * - Examples: 'Primitive Available', 'Related Hooks'
 *
 * OUTLINE (Gray) - Secondary Features
 * - Use for enhanced capabilities that are nice-to-have but not core
 * - Examples: 'Accessibility Enhanced'
 *
 * WARNING (Amber) - Requirements/Considerations
 * - Reserved for requirements or important considerations developers should keep in mind
 * - Examples: Future badges for requirements or warnings
 */

const badgeConfig: Record<DocBadgeType, DocBadge> = {
  polymorphic: {
    label: 'Polymorphic',
    variant: 'primary' as const,
    href: './?path=/docs/core-concepts-polymorphic-components--docs',
    target: '_blank',
  },
  compound: {
    label: 'Compound Component',
    variant: 'primary' as const,
    href: './?path=/docs/core-concepts-compound-components--docs',
    target: '_blank',
  },
  primitive: {
    label: 'Primitive',
    variant: 'primary' as const,
    href: './?path=/docs/core-concepts-two-tier-components--docs#primitive-components',
    target: '_blank',
  },
  animated: {
    label: 'Animated',
    variant: 'primary' as const,
    href: './?path=/docs/core-concepts-animations--docs',
    target: '_blank',
  },
  'primitive-available': {
    label: 'Primitive Available',
    variant: 'success' as const,
    href: './?path=/docs/core-concepts-two-tier-components--docs#primitive-components',
    target: '_blank',
  },
  hooks: {
    label: 'Related Hooks',
    variant: 'success' as const,
    href: '#related-hooks',
  },

  accessibility: {
    label: 'Accessibility Enhanced',
    variant: 'outline' as const,
    href: './?path=/docs/core-concepts-accessibility--docs',
    target: '_blank',
  },
};

type DocBadge = {
  label: string;
  variant: 'primary' | 'success' | 'outline' | 'warning';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

export const DOC_BADGES = {
  POLYMORPHIC: 'polymorphic',
  COMPOUND: 'compound',
  ANIMATED: 'animated',
  PRIMITIVE: 'primitive',
  PRIMITIVE_AVAILABLE: 'primitive-available',
  HOOKS: 'hooks',
  ACCESSIBILITY: 'accessibility',
} as const;

export type DocBadgeType = (typeof DOC_BADGES)[keyof typeof DOC_BADGES];

type DocBadgeProps = {
  type: DocBadgeType;
};

export function DocBadge(props: DocBadgeProps) {
  const { type } = props;

  const { variant, label, href, target, ...restProps } = badgeConfig[type];

  return (
    <Badge
      as={href ? 'a' : 'span'}
      {...(href && { href, target })}
      variant={variant}
      size="lg"
      className="sb-unstyled no-underline transition-opacity hover:opacity-80"
      {...restProps}
    >
      {label}
    </Badge>
  );
}

type DocBadgesProps = ComponentPropsWithRef<'div'> & {
  badges?: DocBadgeType[];
};

const StyledDocBadges = styled.div(withReset);

export function DocBadges(props: DocBadgesProps) {
  const { badges, className, ...restProps } = props;

  const {
    csfFile: {
      meta: { parameters },
    },
  } = useOfMeta();

  const effectiveBadges: DocBadgeType[] = badges ?? parameters?.['docs']?.badges;

  if (!effectiveBadges?.length) return null;

  return (
    <StyledDocBadges
      className={cn('sb-unstyled flex flex-wrap gap-2', className)}
      {...restProps}
    >
      {effectiveBadges.map((badge, index) => {
        return (
          <DocBadge
            key={index}
            type={badge}
          />
        );
      })}
    </StyledDocBadges>
  );
}
