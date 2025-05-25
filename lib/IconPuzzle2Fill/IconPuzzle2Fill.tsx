import { ReactComponent as Puzzle2FillSvg } from '@/assets/svgs/puzzle-2-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPuzzle2Fill(props: Omit<IconProps, 'as'>) {
  return <Icon as={Puzzle2FillSvg} {...props} />;
}
