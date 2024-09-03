import StarLine from '@lib/assets/star-line.svg';

export const icons = {
  'star-line': StarLine,
} as const;

export type IconName = keyof typeof icons;
