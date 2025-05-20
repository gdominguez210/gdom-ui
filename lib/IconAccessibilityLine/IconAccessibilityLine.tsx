import { ReactComponent as AccessibilityLineSvg } from '@/assets/svgs/accessibility-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconAccessibilityLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={AccessibilityLineSvg} {...props} />;
}
