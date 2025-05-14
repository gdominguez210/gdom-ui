import { ReactComponent as ColorFilterLineSvg } from '@lib/assets/svgs/color-filter-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconColorFilterLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={ColorFilterLineSvg} {...props} />;
}
