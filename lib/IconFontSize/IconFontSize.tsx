import { ReactComponent as FontSizeSvg } from '@/assets/svgs/font-size.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconFontSize(props: Omit<IconProps, 'as'>) {
  return <Icon as={FontSizeSvg} {...props} />;
}
