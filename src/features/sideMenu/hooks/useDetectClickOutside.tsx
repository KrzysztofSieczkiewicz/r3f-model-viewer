import React, { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

type BackdropProps = {
  children?: ReactNode,
  onClick?: () => void;
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
      callback();
    }
  }, [refs, isActive, callback]);

  useEffect(() => {
    if (!isActive || !isMounted.current) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, refs, callback]);

  const BackdropPreventInteraction = useCallback(({children, onClick}: BackdropProps) => (
    <div
      id="BackdropInteractionPrevention"
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        zIndex: 0,
        transform: 'translateZ(0)',
        pointerEvents: 'auto',
        backgroundColor: 'red'
      }}
    >
      {children}
    </div>
  ), []);

  return BackdropPreventInteraction
};