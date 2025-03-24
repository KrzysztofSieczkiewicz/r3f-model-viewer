import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../../../components/contexts/EffectsContext';

import { ListedEffect } from './ListedEffect';
import { EFFECT_TYPES, EffectType } from '../../../../models/Effect';
import { Submenu } from '../common/submenu/Submenu';
import { SubmenuSection } from '../common/submenu/SubmenuSection';
import { DropdownAddListedObject } from '../common/submenu/DropdownAddListedObject';



export const EffectsSubmenu = () => {
    const { effectsList, addEffect, getAvailableEffects } = useEffectsContext();
   
    const [activeEffect, setActiveEffect] = useState<EffectType | null>(null);

    const handleItemClick = (type: EffectType) => {
        if (activeEffect === type) {
            setActiveEffect(null);
        } else {
            setActiveEffect(type);
        }
    };
    
    return (
        <Submenu>
            <SubmenuSection>
                <DropdownAddListedObject<EffectType>
                    availableOptions={getAvailableEffects()}
                    allOptions={Object.values(EFFECT_TYPES)}
                    onClick={(type: EffectType) => addEffect(type)} />
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