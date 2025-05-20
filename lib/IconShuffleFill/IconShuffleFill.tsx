import { ReactComponent as ShuffleFillSvg } from '@/assets/svgs/shuffle-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconShuffleFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={ShuffleFillSvg} {...props} />;
}
