import { ReactComponent as PaletteLineSvg } from '@lib/assets/svgs/palette-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconPaletteLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={PaletteLineSvg} {...props} />;
}
