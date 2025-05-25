import { ReactComponent as GithubFillSvg } from '@/assets/svgs/github-fill.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconGithubFill(props: Omit<IconProps, 'as'>) {
  return <Icon as={GithubFillSvg} {...props} />;
}
