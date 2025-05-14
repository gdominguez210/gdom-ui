import { ReactComponent as ForwardEndFillSvg } from '@lib/assets/svgs/forward-end-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconForwardEndFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={ForwardEndFillSvg} {...props} />;
}
