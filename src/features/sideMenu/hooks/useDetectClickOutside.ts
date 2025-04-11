import { useEffect } from "react";

export const useDetectClickOutside = (
    refs: Array<React.RefObject<HTMLElement>>,
    isActive: boolean,
    callback: () => void
  ) => {
    useEffect(() => {
      if (!isActive) return;
  
      const handleClickOutside = (event: MouseEvent) => {
        const isClickInside = refs.some(ref => 
          ref.current?.contains(event.target as Node)
        );

        if (!isClickInside) {
          callback();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isActive, refs, callback]);
  };