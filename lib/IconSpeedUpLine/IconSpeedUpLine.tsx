import { ReactComponent as SpeedUpLineSvg } from '@lib/assets/svgs/speed-up-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconSpeedUpLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={SpeedUpLineSvg} {...props} />;
}
