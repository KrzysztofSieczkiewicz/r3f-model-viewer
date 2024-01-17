import { useContext, useState } from 'react';
import { SidebarControlsContext } from '../SidebarControlsContext';
import { LightItem } from './LightItem';

export function LightsMenu() {
    const { lightsList } = useContext(SidebarControlsContext);
   
    const [activeItemID, setActiveItemID] = useState<string | null>();

    const handleItemClick = (clickedItemID:string) => {
        setActiveItemID( 
            activeItemID === clickedItemID ? null : clickedItemID 
            );
    };
    
    return (
        <div className="dropdown">
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
        </div>
    );
}