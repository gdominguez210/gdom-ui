import { useOf } from '@storybook/addon-docs/blocks';

export function useOfMeta() {
  const resolvedOf = useOf('meta');

  if (resolvedOf.type !== 'meta') {
    throw new Error('useOfMeta must be used within a meta block');
  }

  return {
    ...resolvedOf,
  };
}
