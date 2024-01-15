import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPicker {
  name: string
  handleChange: (color: string) => void
}

export function ColorPicker(props) {
  const [ color, setColor ] = useState(props.value);

  useEffect(() => {
    props.handleChange(color);
  }, [color])

  const popupRef = useRef();

  const [ active, setActive ] = useState(false);
  const [ position, setPosition ] = useState([]);

  function toggleColorPicker(e) {
    setPosition(e.clientX - 25);
    setActive(!active);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (active && popupRef.current && !popupRef.current.contains(e.target)) {
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
      <div data-ref={popupRef} className="color-popup" style={{ left: position }}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>}
    </div>
  );
}