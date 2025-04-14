import { useCallback, useEffect, useRef } from "react";

export const useDetectClickOutside = (
    refs: Array<React.RefObject<HTMLElement>>,
    isActive: boolean,
    callback: () => void
  ) => {

    const isMounted = useRef(true);

    const handleClickOutside = useCallback((event: MouseEvent) => {
      const isClickInside = refs.some(ref => 
        ref.current?.contains(event.target as Node)
      );

      if (!isClickInside) {
        callback();
      }
    }, [refs, isActive, callback]);

    useEffect(() => {
      if (!isActive || !isMounted.current) return;
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isActive, refs, callback]);
  };