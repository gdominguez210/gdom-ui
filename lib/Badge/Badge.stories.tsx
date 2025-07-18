import type { StoryObj, Meta } from '@storybook/react-vite';
import { Badge as BadgeComponent } from '@/lib/Badge';

export default {
  title: 'components/Badge',
  component: BadgeComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'danger', 'warning', 'success', 'primary', 'outline'],
      description: 'The visual style variant of the badge',
      table: {
        type: { summary: 'neutral | danger | warning | success | primary | outline' },
        defaultValue: { summary: 'neutral' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    as: {
      control: 'text',
      description: 'The HTML element or React component to render as',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'span' },
      },
    },
  },
} as Meta<typeof BadgeComponent>;

export const Badge: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default badge with neutral variant and medium size.',
      },
    },
  },
};

export const BadgeNeutral: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'neutral',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with neutral variant - uses gray color scheme for general purpose labeling.',
      },
    },
  },
};

export const BadgeDanger: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with danger variant - uses red color scheme to indicate errors, warnings, or critical states.',
      },
    },
  },
};

export const BadgeWarning: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with warning variant - uses amber color scheme to indicate caution or important information.',
      },
    },
  },
};

export const BadgeSuccess: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with success variant - uses green color scheme to indicate successful operations or positive states.',
      },
    },
  },
};

export const BadgePrimary: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with primary variant - uses blue color scheme for primary actions or highlighted content.',
      },
    },
  },
};

export const BadgeOutline: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with outline variant - uses border-only styling for a more subtle appearance.',
      },
    },
  },
};

export const BadgeSmall: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with small size - compact styling with smaller text and padding.',
      },
    },
  },
};

export const BadgeMedium: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with medium size - the default size with balanced text and padding.',
      },
    },
  },
};

export const BadgeLarge: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with large size - more prominent styling with larger text and padding.',
      },
    },
  },
};
