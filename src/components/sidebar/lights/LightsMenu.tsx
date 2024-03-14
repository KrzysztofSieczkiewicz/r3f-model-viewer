import { useState } from 'react';

import { LightItem } from './LightItem';
import React from 'react';
import { useSidebarControlsContext } from '../SidebarControlsContext';
import { LightWrapper } from '../../../models/Light';


//TODO: THIS AND Assets.js can be merged into common class by just providing assets- or lightsList as prop an just iterating through
export const LightsMenu = () => {
    const { lightsList } = useSidebarControlsContext();
   
    const [activeId, setActiveItem] = useState<string>("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <div className="dropdown">
            {lightsList.map((light: LightWrapper) => {
                return (
                    <LightItem
                        light={light} 
                        key={light.id}
                        active={activeId === light.id}
                        onClick={() => handleItemClick(light.id)}
                    />
                );
            })}
        </div>
    );
}