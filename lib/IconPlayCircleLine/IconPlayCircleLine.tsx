import { ReactComponent as PlayCircleLineSvg } from '@lib/assets/svgs/play-circle-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconPlayCircleLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={PlayCircleLineSvg} {...props} />;
}
