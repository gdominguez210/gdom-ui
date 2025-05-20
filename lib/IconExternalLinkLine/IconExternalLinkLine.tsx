import { ReactComponent as ExternalLinkLineSvg } from '@/assets/svgs/external-link-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconExternalLinkLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={ExternalLinkLineSvg} {...props} />;
}
