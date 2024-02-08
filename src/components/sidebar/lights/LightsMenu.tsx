import { useContext, useState } from 'react';
import { SidebarControlsContext } from '../SidebarControlsContext';
import { LightItem } from './LightItem';
import { StyledDropdown } from "../Sidebar.styles"

export function LightsMenu() {
    const { lightsList } = useContext(SidebarControlsContext);
   
    const [activeItemID, setActiveItemID] = useState<string | null>();

    const handleItemClick = (clickedItemID:string) => {
        setActiveItemID( 
            activeItemID === clickedItemID ? null : clickedItemID 
            );
    };
    
    return (
        <StyledDropdown>
            {lightsList.map((light) => {
                return (
                    <LightItem
                        light={light} 
                        key={light.id}
                        active={activeItemID === light.id}
                        onClick={() => handleItemClick(light.id)}
                    />
                );
            })}
        </StyledDropdown>
    );
}