import { ReactComponent as RepeatFillSvg } from '@/assets/svgs/repeat-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconRepeatFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={RepeatFillSvg} {...props} />;
}
