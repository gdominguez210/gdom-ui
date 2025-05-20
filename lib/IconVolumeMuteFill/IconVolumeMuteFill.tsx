import { ReactComponent as VolumeMuteFillSvg } from '@/assets/svgs/volume-mute-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconVolumeMuteFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={VolumeMuteFillSvg} {...props} />;
}
