import React from 'react';
import { useState } from 'react';
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';

import { LightItem } from './LightItem';
import { LightWrapper } from '../../../models/Light';
import { AddLightDropdown } from './AddLightDropdown';
import { SidebarMenu } from '../commons/SidebarMenu';
import { MenuSection } from '../commons/MenuSection';


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
        <SidebarMenu>
            <MenuSection>
                <AddLightDropdown />
            </MenuSection>

            <MenuSection title="Lights">
                {lightsList.map((light: LightWrapper) => {
                    return <LightItem
                        key={light.id}
                        isActive={activeId === light.id}
                        light={light}
                        toggleExtend={() => toggleItemExtension(light.id)}
                    />
                })}
            </MenuSection> 
        </SidebarMenu>
    );
}