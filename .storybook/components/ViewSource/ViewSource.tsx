import { Button, type ButtonProps } from '@/lib/Button/Button';
import { IconLibrary } from '@/lib/IconLibrary/IconLibrary';
import { cn } from '@/utils/cn';
import { useOf } from '@storybook/addon-docs/blocks';

const BASE_URL = 'https://github.com/gdominguez210/gdom-ui/tree/main/lib/';

export type ViewSourceProps = Omit<ButtonProps<'a'>, 'as' | 'iconOnly'>;

export function ViewSource(props: ViewSourceProps) {
  const { className, href, ...restProps } = props;

  const resolved = useOf('component');
  const component = resolved?.type === 'component' ? resolved.component : null;

  const composedUrl = `${BASE_URL}${href ?? component?.displayName}`;

  return (
    <Button
      as="a"
      href={composedUrl}
      variant="secondary"
      target="_blank"
      size="lg"
      className={cn('text-sky-500', className)}
      {...restProps}
    >
      <span>View Source</span>
      <IconLibrary name="external-link-line" />
    </Button>
  );
}
