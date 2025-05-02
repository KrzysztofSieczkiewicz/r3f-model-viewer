import React from 'react';
import { useState } from 'react';
import { useSceneObjectsContext } from '../../../common/contexts/SceneObjectsContext';

import { ListedLight } from './ListedLight';
import { LIGHT_TYPES, LightType, LightWrapper } from '../../../../models/Light';
import { SubmenuSection } from '../common/submenus/SubmenuSection';
import { DropdownAddListedObject } from '../common/controls/DropdownAddListedObject';
import { Submenu } from '../common/submenus/Submenu';

type Props = {
    active: boolean;
}

export const LightsSubenu = ({active}: Props) => {
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
        <Submenu active={active}>
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