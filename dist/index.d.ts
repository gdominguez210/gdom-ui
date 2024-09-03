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

export declare interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The color of the button.
     */
    color?: 'primary' | 'success' | 'info' | 'warning' | 'error';
    /**
     * The size of the button.
     */
    size?: 'small' | 'medium' | 'large';
}

export declare const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

declare type IconName = keyof typeof icons;

export declare interface IconProps extends SVGAttributes<SVGElement> {
    name: IconName;
}

declare const icons: {
    readonly 'star-line': string;
};

export { }
