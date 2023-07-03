import { useContext, useState } from 'react';
import SidebarControlsContext from '../../SidebarControlsContext'

import { LightItem } from './LightItem';

export function LightsMenu() {
    const { lightsList, updateLight } = useContext(SidebarControlsContext);
   
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
                        updateLight={updateLight} 
                        key={light.id}
                        active={activeItem === light.id}
                        onClick={() => handleItemClick(light.id)}
                    />
                );
            })}
        </div>
    );
}