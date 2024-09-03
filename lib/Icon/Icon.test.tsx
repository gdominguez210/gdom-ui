import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Icon } from '@lib/Icon';

describe('Icon should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<Icon name="star-line" />);
    expect(container).toMatchSnapshot();
  });
});
