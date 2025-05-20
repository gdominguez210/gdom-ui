import { ReactComponent as EqualizerLineSvg } from '@/assets/svgs/equalizer-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconEqualizerLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={EqualizerLineSvg} {...props} />;
}
