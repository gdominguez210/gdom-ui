import { ReactComponent as PlayLargeFillSvg } from '@lib/assets/svgs/play-large-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconPlayLargeFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={PlayLargeFillSvg} {...props} />;
}
