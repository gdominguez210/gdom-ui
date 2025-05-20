'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlaylistContext = require('./useAudioPlaylistContext-B1FRcv_T.js');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const useFocusFirstElement = require('./useFocusFirstElement-oHWPtGzj.js');
const useFocusElement = require('./useFocusElement-7b0FZApq.js');
const useFocusTrap = require('./useFocusTrap-_vVQS7xh.js');

function AudioPlaylistExpandableContainerPrimitive(props) {
  const { as: Element = "div", isExpanded, children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        bundleMjs.clsx(
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
  useFocusFirstElement.useFocusFirstElement({
    containerRef,
    shouldFocus: isPlaylistVisible
  });
  useFocusElement.useFocusElement({
    containerRef,
    elementToFocus: toggleRef,
    shouldFocus: !isPlaylistVisible
  });
  useFocusTrap.useFocusTrap({
    containerRef,
    isActive: isPlaylistVisible,
    onEscape: onClose,
    preventOutsideClicks: false
  });
}

function AudioPlaylistExpandableContainer(props) {
  const { isPlaylistVisible, expandableContainerRef, toggleRef, togglePlaylist, id } = useAudioPlaylistContext.useAudioPlaylistContext();
  const composedRef = useComposedRefs.useComposedRefs(expandableContainerRef, props.ref);
  useAudioPlaylistExpandableContainer({
    isPlaylistVisible,
    containerRef: expandableContainerRef,
    toggleRef,
    onClose: togglePlaylist
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.AudioPlaylistExpandableContainer = AudioPlaylistExpandableContainer;
exports.AudioPlaylistExpandableContainerPrimitive = AudioPlaylistExpandableContainerPrimitive;
exports.useAudioPlaylistExpandableContainer = useAudioPlaylistExpandableContainer;
