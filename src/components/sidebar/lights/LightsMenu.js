import { useContext, useState } from 'react';
import SidebarControlsContext from '../../sidebar/SidebarControlsContext'

import { LightItem } from './LightItem';

//TODO: THIS AND Assets.js can be merged into common class by just providing assets- or lightsList as prop an just iterating through
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