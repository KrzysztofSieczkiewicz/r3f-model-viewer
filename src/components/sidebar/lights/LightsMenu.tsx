import React from 'react';
import { useState } from 'react';
import styles from '../Sidebar.module.css';
import { useSidebarControlsContext } from '../SidebarControlsContext';

import { LightItem } from './LightItem';
import { LightWrapper } from '../../../models/Light';


export const LightsMenu = () => {
    const { lightsList } = useSidebarControlsContext();
   
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
                <h3 className={styles.sectionHeader}>Add/Remove</h3>
                <p> this section should contain methods to add new lights</p>
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Lights</h3>
                
                {lightsList.map((light: LightWrapper) => {
                    return (
                        <LightItem
                            light={light} 
                            key={light.id}
                            active={activeId === light.id}
                            onClick={() => handleItemClick(light.id)}
                        />
                    );
                })}

            </section>
            
        </div>
    );
}