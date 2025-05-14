import { ReactComponent as CodeLineSvg } from '@lib/assets/svgs/code-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconCodeLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={CodeLineSvg} {...props} />;
}
