import { useState } from 'react';

import { LightItem } from './LightItem';
import React from 'react';
import { useSidebarControlsContext } from '../SidebarControlsContext';
import { LightWrapper } from '../../../models/Light';


export const LightsMenu = () => {
    const { lightsList } = useSidebarControlsContext();
   
    const [activeId, setActiveItem] = useState("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <div className="dropdown">
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Add/Remove</h3>
                <p> this section should contain methods to add new lights</p>
            </section>
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Lights</h3>
                
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

            </section>
            
        </div>
    );
}