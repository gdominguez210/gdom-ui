import { ReactComponent as Sparkling2FillSvg } from '@/assets/svgs/sparkling-2-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconSparkling2Fill(props: Omit<IconProps, 'as'>) {
  return <Icon as={Sparkling2FillSvg} {...props} />;
}
