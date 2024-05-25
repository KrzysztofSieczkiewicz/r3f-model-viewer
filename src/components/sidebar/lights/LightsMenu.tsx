import React from 'react';
import { useState } from 'react';
import styles from '../Sidebar.module.css';
import lightStyles from './Lights.module.css'
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';

import { LightItem } from './LightItem';
import { LightWrapper } from '../../../models/Light';


export const LightsMenu = () => {
    const { lightsList, updateLight, deleteLight, addLight } = useSceneObjectsContext();
   
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
                            type={light.type}
                            position={light.position}
                            color={light.color}
                            isVisible={light.visible}
                            intensity={light.intensity}
                            distance={light.distance}
                            angle={light.angle}
                            penumbra={light.penumbra}

                            onClick={() => handleItemClick(light.id)}
                            updateLight={ (change: Partial<LightWrapper>) => updateLight(light.id, change)}
                            deleteLight={ () => deleteLight(light.id)}
                        />
                    );
                })}

            </section>
            
        </div>
    );
}