import { ReactComponent as StopLargeFillSvg } from '@lib/assets/svgs/stop-large-fill.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconStopLargeFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={StopLargeFillSvg} {...props} />;
}
