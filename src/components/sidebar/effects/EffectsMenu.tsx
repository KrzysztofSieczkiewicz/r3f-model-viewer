import { useState } from 'react';

import React from 'react';
import { useSidebarControlsContext } from '../SidebarControlsContext';
import { EffectItem } from './EffectItem';


export const EffectsMenu = () => {
    const { effectsList } = useSidebarControlsContext();
   
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
                <h3 className="section-header">Effects</h3>
                {effectsList.map((effect) => {
                    return (
                        <EffectItem
                            effect={effect} 
                            key={effect.id}
                            active={activeId === effect.id}
                            onClick={() => handleItemClick(effect.id)}
                        />
                    );
                })}
            </section>
        </div>
    );
}