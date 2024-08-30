

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Badge } from '@lib/Badge';

describe('Badge should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
});
