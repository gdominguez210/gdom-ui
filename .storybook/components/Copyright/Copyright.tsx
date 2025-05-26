import { type ComponentPropsWithRef } from 'react';
import { Button } from '@/lib/Button/Button';
import clsx from 'clsx';

const START_YEAR = 2024;
const CURRENT_YEAR = new Date().getFullYear();
const AUTHOR = 'Gary Dominguez';
const LICENSE_URL = 'https://github.com/gdominguez210/gdom-ui/blob/main/LICENSE.md';

export type CopyrightProps = ComponentPropsWithRef<'div'>;

export function Copyright(props: CopyrightProps) {
  const { className, ...rest } = props;
  const year = CURRENT_YEAR > START_YEAR ? `${START_YEAR} - ${CURRENT_YEAR}` : START_YEAR;

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center gap-2 text-sm text-balance text-slate-500',
        className,
      )}
      {...rest}
    >
      <span>
        © {year} {AUTHOR}
      </span>
      <Button
        variant="linkColor"
        as="a"
        href={LICENSE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        License
      </Button>
    </div>
  );
}
