import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../../../components/contexts/EffectsContext';

import { ListedEffect } from './ListedEffect';
import { EffectTypes } from '../../../../models/Effect';
import { AddEffectDropdown } from '../../../../components/sidebar/effects/AddEffectDropdown';
import { Submenu } from '../common/submenu/Submenu';
import { SubmenuSection } from '../common/submenu/SubmenuSection';



export const EffectsSubmenu = () => {
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
        <Submenu>
            <SubmenuSection>
                <AddEffectDropdown />
            </SubmenuSection>

            <SubmenuSection title="Effects">
                {effectsList.map((effect) => {
                    return (
                        <ListedEffect
                            key={effect.type}
                            effect={effect}
                            isActive={activeEffect === effect.type}
                            toggleExtend={() => handleItemClick(effect.type)}
                        />
                    );
                })}
            </SubmenuSection>
        </Submenu>
    );
}