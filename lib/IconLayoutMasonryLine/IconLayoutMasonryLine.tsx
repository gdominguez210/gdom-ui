import { ReactComponent as LayoutMasonryLineSvg } from '@lib/assets/svgs/layout-masonry-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconLayoutMasonryLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={LayoutMasonryLineSvg} {...props} />;
}
