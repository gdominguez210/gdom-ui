import { type RefObject } from 'react';
import { useFocusFirstElement } from '@lib/useFocusFirstElement/useFocusFirstElement';
import { useFocusElement } from '@lib/useFocusElement/useFocusElement';
import { useFocusTrap } from '@lib/useFocusTrap/useFocusTrap';

export type useAudioPlayerExpandableContainer = {
  isPlaylistVisible: boolean;
  containerRef: RefObject<HTMLElement | null>;
  toggleRef: RefObject<HTMLElement | null>;
  onClose?: () => void;
};

export function useAudioPlaylistExpandableContainer(props: useAudioPlayerExpandableContainer) {
  const { isPlaylistVisible, containerRef, toggleRef, onClose } = props;

  useFocusFirstElement({
    containerRef: containerRef,
    shouldFocus: isPlaylistVisible,
  });

  useFocusElement({
    containerRef: containerRef,
    elementToFocus: toggleRef,
    shouldFocus: !isPlaylistVisible,
  });

  useFocusTrap({
    containerRef: containerRef,
    isActive: isPlaylistVisible,
    onEscape: onClose,
  });
}
