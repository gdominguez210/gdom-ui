import { ReactComponent as RewindStartFillSvg } from '@/assets/svgs/rewind-start-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconRewindStartFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={RewindStartFillSvg} {...props} />;
}
