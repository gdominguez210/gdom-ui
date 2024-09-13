import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { RefAttributes } from 'react';
import { SVGAttributes } from 'react';

export declare const Badge: ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLElement>>;

export declare interface BadgeProps extends HTMLAttributes<HTMLElement> {
    /** @default span */
    as?: ElementType;
    /** @default neutral */
    variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'brand';
    /** @default md */
    size?: 'sm' | 'md' | 'lg';
}

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export declare type ButtonProps = CommonButtonProps & iconButtonAccessibleProps;

declare interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}

export declare const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

declare type iconButtonAccessibleProps = {
    /**
     * Switches to use icon button styling
     * @default false
     */
    iconOnly?: false;
    'aria-label'?: string;
} | {
    iconOnly?: true;
    'aria-label': string;
};

declare type IconName = keyof typeof icons;

export declare interface IconProps extends SVGAttributes<SVGElement> {
    name: IconName;
}

declare const icons: {
    readonly 'star-line': string;
};

declare type Size = SizesAsTypes[number];

declare const sizes: readonly ["md", "lg", "xl", "xxl"];

declare type SizesAsTypes = typeof sizes;

declare type Variant = VariantsAsTypes[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"];

declare type VariantsAsTypes = typeof variants;

export { }
