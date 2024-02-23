import React from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    value: string,
    list: Light[],
    handleChange: (item: string) => void
}

type Light = {
    type: string,
    display: string
}

export const Dropdown = (props: Props): JSX.Element => {
    const { value, list, handleChange } = props;

    const [ isOpen, setIsOpen ] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    function toggleList() {
        setIsOpen(!isOpen); 
    }

    function selectItem(item: string) {
        handleChange(item);
        setIsOpen(false);
    }

    function getDisplayedByType(type: string) {
        return list.find((light: Light) =>  light.type === type)?.display
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
          if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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
                className={`dd-header ${isOpen ? "active" : ""}`}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleList()
                }}
            >
                <div className="dd-header-title">{getDisplayedByType(value)}</div>
                {isOpen
                ? <span className="dd-header-arrow">&#8657;</span>
                : <span className="dd-header-arrow">&#8659;</span>}
            </button>
            {isOpen && (
                <div className="dd-list">
                    {list.map((item: Light) => (
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