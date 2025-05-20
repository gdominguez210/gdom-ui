import { ReactComponent as DiscFillSvg } from '@/assets/svgs/disc-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconDiscFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={DiscFillSvg} {...props} />;
}
