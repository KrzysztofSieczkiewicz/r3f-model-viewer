import React from "react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  name: string,
  value: string,
  handleChange: (color: string) => void,

}

export const ColorPicker = (props :Props) :JSX.Element => {
  const [ color, setColor ] = useState(props.value);

  useEffect(() => {
    props.handleChange(color);
  }, [color])

  const popupRef = useRef<HTMLDivElement | null>(null);

  const [ active, setActive ] = useState(false);
  const [ position, setPosition ] = useState(0);

  function toggleColorPicker(e: React.MouseEvent<HTMLDivElement>) {
    setPosition(e.clientX - 25);
    setActive(!active);
  }

  useEffect(() => {
    function handleClickOutside(e :MouseEvent) {
      if (active && popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, active]);

  return (
    <div className="trait">
      <label className="trait-name">{props.name}</label>
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