import { ComponentPropsWithRef, ElementType } from 'react';
export type PolymorphicProps<T extends ElementType> = ComponentPropsWithRef<T> & {
    as?: T;
};
export declare function Polymorphic<T extends ElementType>(props: PolymorphicProps<T>): import("react/jsx-runtime").JSX.Element;
