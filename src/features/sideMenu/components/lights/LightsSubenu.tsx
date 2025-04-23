import React from 'react';
import { useState } from 'react';
import { useSceneObjectsContext } from '../../../common/contexts/SceneObjectsContext';

import { ListedLight } from './ListedLight';
import { LIGHT_TYPES, LightType, LightWrapper } from '../../../../models/Light';
import { SubmenuSection } from '../common/submenus/SubmenuSection';
import { Submenu } from '../common/submenus/Submenu';
import { DropdownAddListedObject } from '../common/controls/DropdownAddListedObject';


export const LightsSubenu = () => {
    const { lightsList, addDefaultLight } = useSceneObjectsContext();
   
    const [activeId, setActiveItem] = useState("");

    const toggleItemExtension = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <Submenu>
            <SubmenuSection>
                <DropdownAddListedObject
                    availableOptions={Object.values(LIGHT_TYPES)}
                    onChange={(type: LightType) => addDefaultLight(type)} />
            </SubmenuSection>

            <SubmenuSection title="Lights">
                {lightsList.map((light: LightWrapper) => {
                    return <ListedLight
                        key={light.id}
                        isActive={activeId === light.id}
                        light={light}
                        toggleExtend={() => toggleItemExtension(light.id)}
                    />
                })}
            </SubmenuSection> 
        </Submenu>
    );
}