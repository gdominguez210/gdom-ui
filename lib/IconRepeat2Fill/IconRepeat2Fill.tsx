import { ReactComponent as Repeat2FillSvg } from '@/assets/svgs/repeat-2-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconRepeat2Fill(props: Omit<IconProps, 'as'>) {
  return <Icon as={Repeat2FillSvg} {...props} />;
}
