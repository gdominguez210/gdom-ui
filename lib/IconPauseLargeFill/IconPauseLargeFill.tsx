import { ReactComponent as PauseLargeFillSvg } from '@/assets/svgs/pause-large-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPauseLargeFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={PauseLargeFillSvg} {...props} />;
}
