import { ReactComponent as PuzzleFillSvg } from '@/assets/svgs/puzzle-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPuzzleFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={PuzzleFillSvg} {...props} />;
}
