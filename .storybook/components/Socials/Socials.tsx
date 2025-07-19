import { type ComponentPropsWithRef } from 'react';
import { Button } from '@/lib/Button/Button';
import { IconLibrary } from '@/lib/IconLibrary/IconLibrary';
import { cn } from '@/utils/cn';

export type SocialsProps = ComponentPropsWithRef<'div'>;

export function Socials(props: SocialsProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn('flex items-center', className)}
      {...rest}
    >
      <Button
        variant="linkGray"
        size="lg"
        as="a"
        href="https://github.com/gdominguez210/gdom-ui"
        iconOnly
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconLibrary name="github-fill" />
      </Button>
      <Button
        variant="linkGray"
        as="a"
        size="lg"
        href="https://www.linkedin.com/in/gary-dominguez/"
        iconOnly
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconLibrary name="linkedin-box-fill" />
      </Button>
    </div>
  );
}
