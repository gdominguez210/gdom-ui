import { ReactComponent as PlaylistSvg } from '@/assets/svgs/playlist.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPlaylist(props: Omit<IconProps, 'as'>) {
  return <Icon as={PlaylistSvg} {...props} />;
}
