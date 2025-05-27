type MousePosition = {
    clientX: number | null;
    clientY: number | null;
    offsetX: number | null;
    offsetY: number | null;
};
export type useMousePositionStateReturn = {
    position: MousePosition;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseLeave: () => void;
    isHovering: boolean;
};
export declare function useMousePositionState(): useMousePositionStateReturn;
export {};
