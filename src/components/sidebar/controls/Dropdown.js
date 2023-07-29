import { useEffect, useRef, useState } from 'react';

// TODO: it works for now, but it should be modified:
// leave type/display logic to the parent, make it simpler => maybe it should only operate on display names, 
// and map them to the type only when calling for change?

export function Dropdown(props) {
    const { value, list, handleChange } = props;

    const [ isOpen, setIsOpen ] = useState(false);
    const dropdownRef = useRef();

    function toggleList() {
        setIsOpen(!isOpen);
    }

    function selectItem(item) {
        handleChange(item);
        setIsOpen(false);
    }

    function getDisplayByType(type) {
        return list.find(light => light.type === type)?.display
    }

    useEffect(() => {
        function handleClickOutside(e) {
          if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);

    return (
        <div className="dd-wrapper"
            ref={dropdownRef}>
            <button
                className="dd-header"
                type="button"
                onClick={(e) => toggleList()}
            >
                <div className="dd-header-title">{getDisplayByType(value)}</div>
                {isOpen
                ? <icon>&#10595;</icon>
                : <icon>&#10597;</icon>}
            </button>
            {isOpen && (
                <div className="dd-list">
                    {list.map((item) => (
                        <button className="dd-list-item"
                            key={item.type}
                            onClick={() => selectItem(item.type)}
                        >
                            {item.display}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}