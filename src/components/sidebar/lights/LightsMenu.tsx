import { useContext, useState } from 'react';

import { LightItem } from './LightItem';
import React from 'react';
import { useSidebarControlsContext } from '../SidebarControlsContext';

type Light = {
    id: string,
    position: number[],
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    visible: boolean,
    type: string,
}

//TODO: THIS AND Assets.js can be merged into common class by just providing assets- or lightsList as prop an just iterating through
export const LightsMenu = () => {
    const { lightsList } = useSidebarControlsContext();
   
    const [activeId, setActiveItem] = useState<string | null>(null);

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveItem(null);
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <div className="dropdown">
            {lightsList.map((light: Light) => {
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