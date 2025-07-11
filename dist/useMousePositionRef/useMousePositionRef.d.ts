export type MousePosition = {
    clientX: number | null;
    clientY: number | null;
    offsetX: number | null;
    offsetY: number | null;
};
export type UseMousePositionRefReturn = {
    getMousePosition: () => MousePosition;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseLeave: (e: React.MouseEvent) => void;
    getIsHovering: () => boolean;
};
export declare function useMousePositionRef(): UseMousePositionRefReturn;
