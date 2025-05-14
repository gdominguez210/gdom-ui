import { ReactComponent as StarLineSvg } from '@lib/assets/svgs/star-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconStarLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={StarLineSvg} {...props} />;
}
