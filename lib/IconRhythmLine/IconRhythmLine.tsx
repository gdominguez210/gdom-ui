import { ReactComponent as RhythmLineSvg } from '@lib/assets/svgs/rhythm-line.svg';
import { Icon, type IconProps } from '@lib/Icon/Icon';

export function IconRhythmLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={RhythmLineSvg} {...props} />;
}
