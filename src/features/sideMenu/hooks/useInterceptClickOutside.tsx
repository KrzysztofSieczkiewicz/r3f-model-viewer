import React, { RefObject, useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export const useInterceptClickOutside = (
  refs: Array<RefObject<HTMLElement>>,
  isActive: boolean,
  callback: () => void
) => {
  const isMounted = useRef(true);

  const { width, height } = useWindowDimensions();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const isClickInBounds = refs.some(ref => ref.current?.contains(event.target as Node) );

    if (isClickInBounds) return;
    
    event.preventDefault();
    callback();
    
  }, [refs, isActive, callback]);

  useEffect(() => {
    if (!isActive || !isMounted.current) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, refs, callback]);

  const BackdropInteractionCatcher = () => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
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


    const computePath = () => {
      const outerRectanglePath = `M0 0 h${width} v${height} h-${width} Z `;
      let path = outerRectanglePath;

      refs.forEach((ref) => {
        if (!ref.current) return;
        const boundingRect = ref.current.getBoundingClientRect();
        path = path.concat(`M${boundingRect.x} ${boundingRect.y} v${boundingRect.height} h${boundingRect.width} v-${boundingRect.height} Z `) 
      });

      return <path d={path} pointerEvents="auto" style={{opacity: 0}}/>
    }
 
    if (!isActive || !portalElement) return null;
    return createPortal(
      <svg
        id="clickInterceptOverlay"
        pointerEvents="none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }} >
        {computePath()}
      </svg>,
      portalElement
    );
  }

  return BackdropInteractionCatcher;
};