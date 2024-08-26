import { ForwardRefExoticComponent } from 'react';
import { RefAttributes } from 'react';

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

export { }
