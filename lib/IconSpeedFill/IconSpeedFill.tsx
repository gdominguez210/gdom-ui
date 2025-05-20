import { ReactComponent as SpeedFillSvg } from '@/assets/svgs/speed-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconSpeedFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={SpeedFillSvg} {...props} />;
}
