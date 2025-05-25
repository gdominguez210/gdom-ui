import { ReactComponent as Sparkling2LineSvg } from '@/assets/svgs/sparkling-2-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconSparkling2Line(props: Omit<IconProps, 'as'>) {
  return <Icon as={Sparkling2LineSvg} {...props} />;
}
