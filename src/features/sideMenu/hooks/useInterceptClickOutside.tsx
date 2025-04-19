import React, { RefObject, useState } from "react";
//import { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const useInterceptClickOutside = (
  refs: Array<RefObject<HTMLElement>>,
  isActive: boolean,
  callback: () => void
) => {

  const isMounted = useRef(true);

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


    const computeClipPaths = (refs: Array<RefObject<HTMLElement>>) => {
      const clipPaths = refs.map((ref, index) => {
        if (!ref.current) return null;
        const boundingRect = ref.current.getBoundingClientRect();
        const clipPathId = `clip-${index}`;
    
        console.log({boundingRect})
        return (
          <clipPath id={clipPathId} key={clipPathId} clipPathUnits="userSpaceOnUse">
            <rect
              x={boundingRect.x}
              y={boundingRect.y}
              width={boundingRect.width}
              height={boundingRect.height}
            />
          </clipPath>
        );
      })
    
      return clipPaths
    }
 
  // TODO[CURRENT]: FINISH WITH SVG https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/clipPath
    if (!isActive || !portalElement) return null;
    return createPortal(
      <svg
        id="clickInterceptOverlay"
        pointerEvents="auto"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }} >
        {computeClipPaths(refs)}
      </svg>,
      portalElement
    );
  }

  return BackdropInteractionCatcher;
};