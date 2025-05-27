import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Polymorphic } from './Polymorphic';

describe('Polymorphic should...', () => {
  test('render as div by default', () => {
    render(
      <Polymorphic data-testid="polymorphic">
        <div>Content</div>
      </Polymorphic>,
    );

    const element = screen.getByTestId('polymorphic');
    expect(element.tagName.toLowerCase()).toBe('div');
  });

  test('render as different element', () => {
    render(
      <Polymorphic
        as="section"
        data-testid="polymorphic"
      >
        <div>Content</div>
      </Polymorphic>,
    );

    const element = screen.getByTestId('polymorphic');
    expect(element.tagName.toLowerCase()).toBe('section');
  });

  test('forward props to rendered element', () => {
    render(
      <Polymorphic
        as="button"
        data-testid="polymorphic"
        type="submit"
        disabled
      >
        Click me
      </Polymorphic>,
    );

    const element = screen.getByTestId('polymorphic');
    expect(element).toHaveAttribute('type', 'submit');
    expect(element).toBeDisabled();
  });

  test('render children', () => {
    render(
      <Polymorphic data-testid="polymorphic">
        <div data-testid="child">Child content</div>
      </Polymorphic>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child content');
  });
});
