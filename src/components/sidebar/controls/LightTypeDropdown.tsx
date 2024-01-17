import { useEffect, useRef, useState, MouseEvent } from 'react';
import { LightType, LightTypesNames } from '../../../interfaces/light.model';

interface LightTypeDropdown {
    selected: LightType,
    handleChange: (type:LightType) => void
}

const LightTypeDropdown = ( {selected, handleChange}:LightTypeDropdown ) => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function getDisplayName() {
        const name = LightTypesNames.find(item => item.type === selected);
        return name ? name.display : '';
    }

    function selectItem(item: LightType) {
        handleChange(item);
        setIsOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent<HTMLDivElement>) {
          if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
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
                    setIsOpen(!isOpen)
                }}
            >
                <div className="dd-header-title">{getDisplayName()}</div>
                {isOpen
                ? <span className="dd-header-arrow">&#8657;</span>
                : <span className="dd-header-arrow">&#8659;</span>}
            </button>
            {isOpen && (
                <div className="dd-list">
                    {LightTypesNames.map((lightType) => (
                        <button className="dd-list-item"
                            key={lightType.display}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectItem(lightType.type);
                            }}
                        >
                            {lightType.display}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LightTypeDropdown;