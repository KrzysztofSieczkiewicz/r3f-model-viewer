import React from 'react';
import { useState } from 'react';
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';

import { ListedLight } from '../../../features/sideMenu/components/lights/ListedLight';
import { LightWrapper } from '../../../models/Light';
import { AddLightDropdown } from './AddLightDropdown';
import { SubmenuSection } from '../../../features/sideMenu/components/common/submenus/SubmenuSection';
import { Submenu } from '../../../features/sideMenu/components/common/submenus/Submenu';


export const LightsMenu = () => {
    const { lightsList } = useSceneObjectsContext();
   
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
                <AddLightDropdown />
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