import React, { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// TODO[CURRENT]: clean up this hook (together with useSidebarModal) and create clean PortalTarget for them. Think about clean PortalTarget handling
export const useInterceptClickOutside = (
  refs: Array<React.RefObject<HTMLElement>>,
  isActive: boolean,
  callback: () => void
) => {




// TODO: CREATE SINGLE DIV AND MAKE IT TRANSPARENT WHERE NEEDED WITH CLIP-PATHS






  const isMounted = useRef(true);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // const isClickInBounds = refs.some(ref => ref.current?.contains(event.target as Node) );

    // if (isClickInBounds) return;
    
    // event.preventDefault();
    // callback();
    
  }, [refs, isActive, callback]);

  useEffect(() => {
    if (!isActive || !isMounted.current) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, refs, callback]);

  const BackdropInteractionCatcher = () => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const recognizeTargetClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!backdropRef.current) return;

      const {clientX, clientY} = event;
      
      backdropRef.current.style.pointerEvents = 'none';
      const elementAtPoint = document.elementFromPoint(clientX, clientY);
      backdropRef.current.style.pointerEvents = 'auto';
  
      const isClickInBounds = refs.some(ref => ref.current === elementAtPoint)
      console.log({elementAtPoint})
  
      if (!isClickInBounds) callback()

    }
  
    useEffect(() => {
      const element = document.getElementById('sidebar-modal');
      if (!element) {
          console.error("Sidebar component should contain a <div id='sidebar-modal'> element.");
          return;
      }
      setPortalElement(element);
  
      return () => {
        setPortalElement(null);
      }
    }, []);
  
    if (!isActive || !portalElement) return null;
    return createPortal(
      <div
        id="ClickInterceptBackdrop"
        ref={backdropRef}
        onClick={(e) => recognizeTargetClick(e)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      </div>,
      portalElement
    );
  }

  return BackdropInteractionCatcher;
};