import { ReactComponent as PlaylistCloseSvg } from '@/assets/svgs/playlist-close.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPlaylistClose(props: Omit<IconProps, 'as'>) {
  return <Icon as={PlaylistCloseSvg} {...props} />;
}
