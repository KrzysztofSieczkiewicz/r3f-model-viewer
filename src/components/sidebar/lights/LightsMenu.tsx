import React from 'react';
import { useState } from 'react';
import styles from '../Sidebar.module.css';
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';

import { LightItem } from './LightItem';
import { LightWrapper } from '../../../models/Light';
import { AddLightDropdown } from './AddLightDropdown';


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
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <AddLightDropdown />
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Lights</h3>
                
                {lightsList.map((light: LightWrapper) => {
                    return (
                        <LightItem
                            key={light.id}
                            isActive={activeId === light.id}
                            light={light}

                            toggleExtend={() => toggleItemExtension(light.id)}
                        />
                    );
                })}

            </section>
        </div>
    );
}