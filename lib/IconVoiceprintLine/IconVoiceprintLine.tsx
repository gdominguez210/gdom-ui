import { ReactComponent as VoiceprintLineSvg } from '@/assets/svgs/voiceprint-line.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconVoiceprintLine(props: Omit<IconProps, 'as'>) {
  return <Icon as={VoiceprintLineSvg} {...props} />;
}
