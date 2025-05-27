import { ComponentPropsWithRef } from 'react';
import { IconName } from './data';
export interface IconLibraryProps extends ComponentPropsWithRef<'svg'> {
    name: IconName;
}
export declare function IconLibrary(props: IconLibraryProps): import("react/jsx-runtime").JSX.Element | null;
