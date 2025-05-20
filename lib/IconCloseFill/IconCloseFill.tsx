import { ReactComponent as CloseFillSvg } from '@/assets/svgs/close-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconCloseFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={CloseFillSvg} {...props} />;
}
