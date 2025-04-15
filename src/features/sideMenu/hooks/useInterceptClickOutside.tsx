import React from "react";
import { useCallback, useEffect, useRef } from "react";

// TODO[CURRENT]: clean up this hook (together with useSidebarModal) and create clean PortalTarget for them. Think about clean PortalTarget handling

// Move this to portal instead
const BackdropInteractionCatcher = () => {

  return (
    <div
      id="BackdropInteractionPrevention"
      style={{
        position: "absolute" as "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        transform: 'translateZ(0)',
        pointerEvents: 'auto',
        backgroundColor: 'red'
      }}
    />
  )
}


// TODO[CURRENT]: move this to the portal solution. maybe include new context for app modals
export const useDetectClickOutside = (
  refs: Array<React.RefObject<HTMLElement>>,
  isActive: boolean,
  callback: () => void
) => {

  const isMounted = useRef(true);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const isClickInBounds = refs.some(ref => ref.current?.contains(event.target as Node) );

    if (!isClickInBounds) {
      event.preventDefault();
      callback();
    }
  }, [refs, isActive, callback]);

  useEffect(() => {
    if (!isActive || !isMounted.current) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, refs, callback]);

  return BackdropInteractionCatcher;
};