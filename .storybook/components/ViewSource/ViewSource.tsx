import { Button, type ButtonProps } from '@lib/Button/Button';
import { Icon } from '@lib/Icon/Icon';

const BASE_URL = 'https://github.com/gdominguez210/gdom-ui/tree/main/lib/';

export type ViewSourceProps = Omit<ButtonProps<'a'>, 'as' | 'iconOnly'>;

export function ViewSource(props: ViewSourceProps) {
  const { className, href, ...restProps } = props;

  const composedUrl = `${BASE_URL}${href}`;

  return (
    <Button
      as="a"
      href={composedUrl}
      variant="secondary"
      target="_blank"
      {...restProps}
    >
      <span>View Source</span>
      <Icon name="external-link-line" />
    </Button>
  );
}
