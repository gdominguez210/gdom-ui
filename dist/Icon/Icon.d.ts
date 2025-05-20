import { ComponentPropsWithRef, ComponentType } from 'react';
export interface IconProps extends ComponentPropsWithRef<'svg'> {
    as: ComponentType<React.SVGProps<SVGSVGElement>>;
}
export declare function Icon(props: IconProps): import("react/jsx-runtime").JSX.Element;
