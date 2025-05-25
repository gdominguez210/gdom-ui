import { ReactComponent as PaletteFillSvg } from '@/assets/svgs/palette-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconPaletteFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={PaletteFillSvg} {...props} />;
}
