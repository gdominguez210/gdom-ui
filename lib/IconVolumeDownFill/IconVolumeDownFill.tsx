import { ReactComponent as VolumeDownFillSvg } from '@/assets/svgs/volume-down-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconVolumeDownFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={VolumeDownFillSvg} {...props} />;
}
