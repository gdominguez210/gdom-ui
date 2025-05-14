import { ReactComponent as PlayListAddFillSvg } from '@lib/assets/svgs/play-list-add-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconPlayListAddFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={PlayListAddFillSvg} {...props} />;
}
