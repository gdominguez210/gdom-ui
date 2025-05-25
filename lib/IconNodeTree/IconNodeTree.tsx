import { ReactComponent as NodeTreeSvg } from '@/assets/svgs/node-tree.svg';
import { Icon, type IconProps } from '@/lib/Icon/Icon';

export function IconNodeTree(props: Omit<IconProps, 'as'>) {
  return <Icon as={NodeTreeSvg} {...props} />;
}
