import { ComponentPropsWithRef } from 'react';
import { UseCanvasResponsiveOptions } from './useCanvasResponsive';
import { UseDevicePixelRatioAdaptiveOptions } from '../useDevicePixelRatioAdaptive/useDevicePixelRatioAdaptive';
export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> & UseCanvasResponsiveOptions & UseDevicePixelRatioAdaptiveOptions;
export declare function CanvasResponsive(props: CanvasResponsiveProps): import("react/jsx-runtime").JSX.Element;
