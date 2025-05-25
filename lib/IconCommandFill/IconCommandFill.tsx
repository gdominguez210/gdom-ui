import { ReactComponent as CommandFillSvg } from '@/assets/svgs/command-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconCommandFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={CommandFillSvg} {...props} />;
}
