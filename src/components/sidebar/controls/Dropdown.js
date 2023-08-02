import { useEffect, useRef, useState } from 'react';

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

    function getDisplayedByType(type) {
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
                onClick={(e) => {
                    e.stopPropagation();
                    toggleList()
                }}
            >
                <div className="dd-header-title">{getDisplayedByType(value)}</div>
                {isOpen
                ? <icon className="dd-header-arrow">&#8657;</icon>
                : <icon className="dd-header-arrow">&#8659;</icon>}
            </button>
            {isOpen && (
                <div className="dd-list">
                    {list.map((item) => (
                        <button className="dd-list-item"
                            key={item.type}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectItem(item.type);
                            }}
                        >
                            {item.display}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}