import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPicker {
  name: string,
  value: string,
  handleChange: (color: string) => void
}

export function ColorPicker( {name, value, handleChange }: ColorPicker ) {

  const [ color, setColor ] = useState<string>(value);
  const [ active, setActive ] = useState<boolean>(false);
  const [ position, setPosition ] = useState<number>();

  const popupRef: RefObject<HTMLElement> = useRef(null);

  useEffect(() => {
    handleChange(color);
  }, [color])
  
  function toggleColorPicker(e: MouseEvent<HTMLDivElement>) {
    setPosition(e.clientX - 25);
    setActive(!active);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent<HTMLDivElement>) {
      if (active && popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, [popupRef, active]);

  return (
    <div className="trait">
      <label className="trait-name">{name}</label>
      <div className="color-picker-preview" onMouseDown={(e) => toggleColorPicker(e)}
        style={{backgroundColor: color}}
      />
      {active && 
      <div data-ref={popupRef} className="color-popup" style={{ left: position }}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>}
    </div>
  );
}