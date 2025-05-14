import { ReactComponent as RepeatOneFillSvg } from '@lib/assets/svgs/repeat-one-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconRepeatOneFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={RepeatOneFillSvg} {...props} />;
}
