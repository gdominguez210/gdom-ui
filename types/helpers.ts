import type { ElementType, ComponentPropsWithRef, ReactElement } from 'react';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

type AsProp<T extends ElementType> = {
  as?: T;
};

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

type DefaultProps = Record<string, never>;

export type PolymorphicProps<T extends ElementType, P = DefaultProps> = P &
  AsProp<T> &
  Omit<ComponentPropsWithRef<T>, PropsToOmit<T, P>>;

export type PolymorphicComponent<DefaultElement extends ElementType, Props = DefaultProps> = <
  T extends ElementType = DefaultElement,
>(
  props: PolymorphicProps<T, Props>,
) => ReactElement | null;
