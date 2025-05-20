import { ReactComponent as PulseLineSvg } from '@/assets/svgs/pulse-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPulseLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={PulseLineSvg} {...props} />;
}
