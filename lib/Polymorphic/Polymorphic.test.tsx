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

  test('render as child element when asChild is true', () => {
    render(
      <Polymorphic
        asChild
        data-testid="polymorphic"
      >
        <button>Click me</button>
      </Polymorphic>,
    );

    const element = screen.getByTestId('polymorphic');
    expect(element.tagName.toLowerCase()).toBe('button');
    expect(element).toHaveTextContent('Click me');
  });

  test('merge props with child element when asChild is true', () => {
    render(
      <Polymorphic
        asChild
        data-testid="polymorphic"
      >
        <button
          type="submit"
          disabled
        >
          Click me
        </button>
      </Polymorphic>,
    );

    const element = screen.getByTestId('polymorphic');
    expect(element).toHaveAttribute('type', 'submit');
    expect(element).toBeDisabled();
  });

  test('merge className with child element when asChild is true', () => {
    render(
      <Polymorphic
        asChild
        data-testid="polymorphic"
        className="parent-class"
      >
        <button className="child-class">Click me</button>
      </Polymorphic>,
    );

    const element = screen.getByTestId('polymorphic');
    expect(element).toHaveClass('parent-class', 'child-class');
  });

  test('child props take precedence over parent props when asChild is true', () => {
    render(
      <Polymorphic
        asChild
        data-testid="parent-test"
      >
        <button data-testid="child-test">Click me</button>
      </Polymorphic>,
    );

    const element = screen.getByTestId('child-test');
    expect(element).toBeInTheDocument();
    expect(screen.queryByTestId('parent-test')).not.toBeInTheDocument();
  });

  test('throw error when asChild is true but no valid child element', () => {
    expect(() => {
      render(
        <Polymorphic
          asChild
          data-testid="polymorphic"
        >
          Text content
        </Polymorphic>,
      );
    }).toThrow('Polymorphic: asChild prop requires a single valid React element as a child');
  });

  test('throw error when asChild is true but multiple children', () => {
    expect(() => {
      render(
        <Polymorphic
          asChild
          data-testid="polymorphic"
        >
          <button>Button 1</button>
          <button>Button 2</button>
        </Polymorphic>,
      );
    }).toThrow('Polymorphic: asChild prop requires a single valid React element as a child');
  });

  test('throw error when asChild is true but no children', () => {
    expect(() => {
      render(
        <Polymorphic
          asChild
          data-testid="polymorphic"
        />,
      );
    }).toThrow('Polymorphic: asChild prop requires a single valid React element as a child');
  });
});
