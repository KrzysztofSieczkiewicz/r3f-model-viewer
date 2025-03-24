import { useEffect } from "react";

export const useHandleOutsideClick = (
    refs: Array<React.RefObject<HTMLElement>>,
    isOpen: boolean,
    callback: () => void
  ) => {
    useEffect(() => {
      if (!isOpen) return;
  
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
    }, [isOpen, refs, callback]);
  };