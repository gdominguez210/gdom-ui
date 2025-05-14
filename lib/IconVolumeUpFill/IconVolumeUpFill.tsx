import { ReactComponent as VolumeUpFillSvg } from '@lib/assets/svgs/volume-up-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconVolumeUpFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={VolumeUpFillSvg} {...props} />;
}
