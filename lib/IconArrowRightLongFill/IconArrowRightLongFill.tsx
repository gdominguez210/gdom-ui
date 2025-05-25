import { ReactComponent as ArrowRightLongFillSvg } from '@/assets/svgs/arrow-right-long-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconArrowRightLongFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={ArrowRightLongFillSvg} {...props} />;
}
