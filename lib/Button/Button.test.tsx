import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Button } from './Button';

it('should render a button', () => {
  render(<Button>Click Me!</Button>);

  expect(screen.getByRole('button', { name: 'Click Me!' })).toBeInTheDocument();
});

it('should call onClick when clicked', async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click Me!</Button>);

  await userEvent.click(screen.getByRole('button', { name: 'Click Me!' }));

  expect(onClick).toHaveBeenCalled();
});
