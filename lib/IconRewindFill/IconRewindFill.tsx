import { ReactComponent as RewindFillSvg } from '@/assets/svgs/rewind-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconRewindFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={RewindFillSvg} {...props} />;
}
