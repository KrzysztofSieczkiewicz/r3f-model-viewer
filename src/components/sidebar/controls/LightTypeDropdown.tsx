import { useEffect, useRef, useState, MouseEvent } from 'react';
import { LightType, LightTypesNames } from '../../../interfaces/light.model';
import { StyledDDButton, SyledDDWrapper } from './Controls.styles';
import { StyledDropdownArrow, StyledDropdownDisplayedName, StyledDropdownList, StyledDropdownListItem } from '../Sidebar.styles';

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
                <StyledDropdownDisplayedName>{getDisplayName()}</StyledDropdownDisplayedName>
                {isOpen
                ? <StyledDropdownArrow>&#8657;</StyledDropdownArrow>
                : <StyledDropdownArrow>&#8659;</StyledDropdownArrow>}
            </StyledDDButton>
            {isOpen && (
                <StyledDropdownList>
                    {LightTypesNames.map((lightType) => (
                        <StyledDropdownListItem
                            key={lightType.display}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectItem(lightType.type);
                            }}
                        >
                            {lightType.display}
                        </StyledDropdownListItem>
                    ))}
                </StyledDropdownList>
            )}
        </SyledDDWrapper>
    )
}

export default LightTypeDropdown;