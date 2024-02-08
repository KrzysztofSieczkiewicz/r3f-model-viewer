import { MouseEvent, createRef, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { StyledAttributeContained, StyledAttributeName, StyledColorPreview, StyledPickerPopup } from './Controls.styles';

interface ColorPicker {
  name: string,
  value: string,
  handleChange: (color: string) => void
}

export function ColorPicker( {name, value, handleChange }: ColorPicker ) {

  const [ color, setColor ] = useState<string>(value);
  const [ active, setActive ] = useState<boolean>(false);
  const [ position, setPosition ] = useState<number>();

  const popupRef = createRef<HTMLDivElement>();

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
    <StyledAttributeContained>
      <StyledAttributeName>{name}</StyledAttributeName>
      <StyledColorPreview onMouseDown={(e) => toggleColorPicker(e)}
        style={{backgroundColor: color}}
      />
      {active && (
      <StyledPickerPopup ref={popupRef} style={{ left: position }}>
        <HexColorPicker color={color} onChange={setColor} />
      </StyledPickerPopup>
      )}
    </StyledAttributeContained>
  );
}