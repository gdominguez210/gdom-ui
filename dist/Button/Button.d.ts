import { ComponentPropsWithRef, ElementType } from 'react';
import { variants, sizes } from './data';
type Variant = (typeof variants)[number];
type Size = (typeof sizes)[number];
type ButtonBaseProps = {
    /**
     * The type of the button.
     * @default primary
     */
    variant?: Variant;
    /**
     * The size of the button.
     * @default md
     */
    size?: Size;
};
type IconButtonAccessibilityProps = {
    iconOnly?: undefined;
    'aria-label'?: string;
} | {
    iconOnly?: false;
    'aria-label'?: string;
} | {
    iconOnly: true;
    'aria-label': string;
};
export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps & IconButtonAccessibilityProps & Omit<ComponentPropsWithRef<T>, keyof ButtonBaseProps | keyof IconButtonAccessibilityProps> & {
    as?: T;
};
export declare function Button<T extends ElementType = 'button'>(props: ButtonProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
