import { ReactComponent as PlayList2FillSvg } from '@lib/assets/svgs/play-list-2-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconPlayList2Fill(props: Omit<IconProps, 'as'>) {
  return <Icon as={PlayList2FillSvg} {...props} />;
}
