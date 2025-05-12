import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from './ColorPicker.module.css';

import { HexColorPicker } from "react-colorful";
import { useInterceptClickOutside as useInterceptClickOutside } from "../../../hooks/useInterceptClickOutside";

type Props = {
  currentColor: string,
  handleChange: (color: string) => void,
}

export const ColorPicker = ( {currentColor, handleChange} :Props) :JSX.Element => {

  const [ isColorPickerOpen, setIsColorPickerOpen ] = useState(false);
  const [ position, setPosition ] = useState(0);

  const previewRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const Backdrop = useInterceptClickOutside(
    [popupRef, previewRef],
    isColorPickerOpen,
    () => setIsColorPickerOpen(false)
  );

  // OPEN AND HIDE COLOR PALETTE
  const toggleColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition(e.clientX - 25);
    setIsColorPickerOpen(active => !active);
  }

  return (
    <>
      <div ref={previewRef} className={styles.colorPreview} onClick={(e) => toggleColorPicker(e) }
        style={{backgroundColor: currentColor}}
      />
      {isColorPickerOpen && 
      <div ref={popupRef} className={styles.popup} style={{ left: position }}>
        <Backdrop />
        <HexColorPicker color={currentColor} onChange={handleChange} />
      </div>}
    </>
  );
}