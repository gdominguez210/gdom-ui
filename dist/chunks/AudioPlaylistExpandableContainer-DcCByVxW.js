import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlaylistContext } from './useAudioPlaylistContext-CslAPyjC.js';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { u as useFocusFirstElement } from './useFocusFirstElement-CbrvELrT.js';
import { u as useFocusElement } from './useFocusElement-DeupWgsG.js';
import { u as useFocusTrap } from './useFocusTrap-DzxfwXAR.js';

function AudioPlaylistExpandableContainerPrimitive(props) {
  const { as: Element = "div", isExpanded, children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "relative overflow-hidden transition-all duration-300",
          {
            "max-h-[300px] opacity-100": isExpanded,
            "pointer-events-none max-h-0 opacity-0": !isExpanded
          },
          className
        )
      ),
      "aria-hidden": !isExpanded,
      ...restProps,
      children
    }
  );
}

function useAudioPlaylistExpandableContainer(props) {
  const { isPlaylistVisible, containerRef, toggleRef, onClose } = props;
  useFocusFirstElement({
    containerRef,
    shouldFocus: isPlaylistVisible
  });
  useFocusElement({
    containerRef,
    elementToFocus: toggleRef,
    shouldFocus: !isPlaylistVisible
  });
  useFocusTrap({
    containerRef,
    isActive: isPlaylistVisible,
    onEscape: onClose,
    preventOutsideClicks: false
  });
}

function AudioPlaylistExpandableContainer(props) {
  const { isPlaylistVisible, expandableContainerRef, toggleRef, togglePlaylist, id } = useAudioPlaylistContext();
  const composedRef = useComposedRefs(expandableContainerRef, props.ref);
  useAudioPlaylistExpandableContainer({
    isPlaylistVisible,
    containerRef: expandableContainerRef,
    toggleRef,
    onClose: togglePlaylist
  });
  return /* @__PURE__ */ jsx(
    AudioPlaylistExpandableContainerPrimitive,
    {
      "aria-hidden": !isPlaylistVisible,
      id,
      ref: composedRef,
      isExpanded: isPlaylistVisible,
      ...props
    }
  );
}

export { AudioPlaylistExpandableContainer as A, AudioPlaylistExpandableContainerPrimitive as a, useAudioPlaylistExpandableContainer as u };
