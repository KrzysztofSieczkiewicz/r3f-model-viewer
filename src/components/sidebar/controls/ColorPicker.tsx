import React from "react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  name: string,
  value: string,
  handleChange: (color: string) => void,
}

export const ColorPicker = ( {name, value, handleChange} :Props) :JSX.Element => {

  const [ active, setActive ] = useState(false);
  const [ color, setColor ] = useState(value);
  const [ position, setPosition ] = useState(0);

  const popupRef = useRef<HTMLDivElement | null>(null);

  // UPDATE COLOR EACH TIME COLOR PICKER CHANGES
  useEffect(() => {
    handleChange(color);
  }, [color])


  // OPEN AND HIDE COLOR PALETTE
  const toggleColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition(e.clientX - 25);
    setActive(active => !active);
  }

  // DETECT IF CLICKED OUTSIDE AND CLOSE COLOR PALETTE
  const handleClickOutside = (e :MouseEvent) => {
    if (active && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setActive(false);
    }
  }


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, active]);

  return (
    <div className="trait">
      <label className="trait-name">{name}</label>
      <div className="color-picker-preview" onMouseDown={(e) => toggleColorPicker(e)}
        style={{backgroundColor: color}}
      />
      {active && 
      <div ref={popupRef} className="color-popup" style={{ left: position }}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>}
    </div>
  );
}