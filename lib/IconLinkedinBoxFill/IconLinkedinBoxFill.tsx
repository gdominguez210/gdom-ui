import { ReactComponent as LinkedinBoxFillSvg } from '@/assets/svgs/linkedin-box-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconLinkedinBoxFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={LinkedinBoxFillSvg} {...props} />;
}
