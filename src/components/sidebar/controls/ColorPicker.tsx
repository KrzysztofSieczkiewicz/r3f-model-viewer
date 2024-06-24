import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from './ColorPicker.module.css';

import { HexColorPicker } from "react-colorful";

type Props = {
  currentColor: string,
  handleChange: (color: string) => void,
}

export const ColorPicker = ( {currentColor, handleChange} :Props) :JSX.Element => {

  const [ isColorPickerOpen, setIsColorPickerOpen ] = useState(false);
  const [ position, setPosition ] = useState(0);

  const popupRef = useRef<HTMLDivElement | null>(null);

  // OPEN AND HIDE COLOR PALETTE
  const toggleColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition(e.clientX - 25);
    setIsColorPickerOpen(active => !active);
  }

  // DETECT IF CLICKED OUTSIDE AND CLOSE COLOR PALETTE
  const handleClickOutside = (e :MouseEvent) => {
    if (isColorPickerOpen && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setIsColorPickerOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, isColorPickerOpen]);

  return (
    <>
      <div className={styles.colorPreview} onMouseDown={(e) => toggleColorPicker(e)}
        style={{backgroundColor: currentColor}}
      />
      {isColorPickerOpen && 
      <div ref={popupRef} className={styles.popup} style={{ left: position }}>
        <HexColorPicker color={currentColor} onChange={handleChange} />
      </div>}
    </>
  );
}