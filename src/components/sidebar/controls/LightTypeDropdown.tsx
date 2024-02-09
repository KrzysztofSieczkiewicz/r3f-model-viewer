import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { LightType, LightTypesNames } from '../../../interfaces/light.model';
import { StyledDDButton, StyledDDArrow, StyledDDDisplayedName, StyledDDList, StyledDDListItem, SyledDDWrapper } from './Controls.styles';

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
        <SyledDDWrapper
            ref={dropdownRef}>
            <StyledDDButton
                className={isOpen ? 'active' : ''}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen)
                }}
            >
                <StyledDDDisplayedName>{getDisplayName()}</StyledDDDisplayedName>
                {isOpen
                ? <StyledDDArrow>&#8657;</StyledDDArrow>
                : <StyledDDArrow>&#8659;</StyledDDArrow>}
            </StyledDDButton>
            {isOpen && (
                <StyledDDList>
                    {LightTypesNames.map((lightType) => (
                        <StyledDDListItem
                            key={lightType.display}
                            onClick={(e: { stopPropagation: () => void; }) => {
                                e.stopPropagation();
                                selectItem(lightType.type);
                            }}
                        >
                            {lightType.display}
                        </StyledDDListItem>
                    ))}
                </StyledDDList>
            )}
        </SyledDDWrapper>
    )
}

export default LightTypeDropdown;