import { ReactComponent as CursorLineSvg } from '@/assets/svgs/cursor-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconCursorLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={CursorLineSvg} {...props} />;
}
