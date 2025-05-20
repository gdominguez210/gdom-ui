import { ComponentPropsWithRef } from 'react';
export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> & {
    frameRate?: number;
    onResize?: () => void;
};
export declare function CanvasResponsive(props: CanvasResponsiveProps): import("react/jsx-runtime").JSX.Element;
