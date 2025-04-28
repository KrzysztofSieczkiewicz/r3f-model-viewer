import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../../common/contexts/EffectsContext';

import { ListedEffect } from './ListedEffect';
import { EFFECT_TYPES, EffectType } from '../../../../models/Effect';
import { SubmenuSection } from '../common/submenus/SubmenuSection';
import { DropdownAddListedObject } from '../common/controls/DropdownAddListedObject';

type Props = {
    active: boolean;
}

export const EffectsSubmenu = ({active}: Props) => {
    const { effectsList, addEffect, getAvailableEffects } = useEffectsContext();
   
    const [activeEffect, setActiveEffect] = useState<EffectType | null>(null);

    const handleItemClick = (type: EffectType) => {
        if (activeEffect === type) {
            setActiveEffect(null);
        } else {
            setActiveEffect(type);
        }
    };
    
    if(!active) return;
    return (
        <>
            <SubmenuSection>
                <DropdownAddListedObject
                    availableOptions={getAvailableEffects()}
                    allOptions={Object.values(EFFECT_TYPES)}
                    onChange={(type: EffectType) => addEffect(type)} />
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
        </>
    );
}