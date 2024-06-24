import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../contexts/EffectsContext';

import { EffectItem } from './EffectItem';
import { EffectTypes } from '../../../models/Effect';
import { AddEffectDropdown } from './AddEffectDropdown';
import { MenuSection } from '../commons/MenuSection';
import { SidebarMenu } from '../commons/SidebarMenu';



export const EffectsMenu = () => {
    const { effectsList } = useEffectsContext();
   
    const [activeEffect, setActiveEffect] = useState<EffectTypes | null>(null);

    const handleItemClick = (type: EffectTypes) => {
        if (activeEffect === type) {
            setActiveEffect(null);
        } else {
            setActiveEffect(type);
        }
    };
    
    return (
        <SidebarMenu>
            <MenuSection>
                <AddEffectDropdown />
            </MenuSection>

            <MenuSection title="Effects">
                {effectsList.map((effect) => {
                    return (
                        <EffectItem
                            key={effect.type}
                            effect={effect}
                            isActive={activeEffect === effect.type}
                            toggleExtend={() => handleItemClick(effect.type)}
                        />
                    );
                })}
            </MenuSection>
        </SidebarMenu>
    );
}