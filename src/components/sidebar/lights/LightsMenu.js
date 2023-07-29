import { useContext, useState } from 'react';
import SidebarControlsContext from '../../sidebar/SidebarControlsContext'

import { LightItem } from './LightItem';

export function LightsMenu() {
    const { lightsList } = useContext(SidebarControlsContext);
   
    const [activeItem, setActiveItem] = useState();

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item)
        }
    };
    
    return (
        <div className="dropdown">
            {lightsList.map((light) => {
                return (
                    <LightItem
                        light={light} 
                        key={light.id}
                        active={activeItem === light.id}
                        onClick={() => handleItemClick(light.id)}
                    />
                );
            })}
        </div>
    );
}