import React from 'react';
import { useState } from 'react';
import styles from '../Sidebar.module.css';
import lightStyles from './Lights.module.css'
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';

import { LightItem } from './LightItem';
import { LightProperties, LightTypes, LightWrapper } from '../../../models/Light';


export const LightsMenu = () => {
    const { lightsList, changeLightType, updateLightProperties, deleteLight, addLight } = useSceneObjectsContext();
   
    const [activeId, setActiveItem] = useState("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <button className={lightStyles.addButton} onClick={() => {addLight()}}> ADD NEW </button>
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Lights</h3>
                
                {lightsList.map((light: LightWrapper) => {
                    return (
                        <LightItem
                            key={light.id}
                            isActive={activeId === light.id}
                            light={light}

                            onClick={() => handleItemClick(light.id)}
                        />
                    );
                })}

            </section>
        </div>
    );
}