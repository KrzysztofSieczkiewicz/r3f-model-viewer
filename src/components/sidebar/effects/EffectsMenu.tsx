import React from 'react';
import { useState } from 'react';
import { useSidebarControlsContext } from '../SidebarControlsContext';
import styles from './../Sidebar.module.css';

import { EffectItem } from './EffectItem';


export const EffectsMenu = () => {
    const { effectsList } = useSidebarControlsContext();
   
    const [activeId, setActiveItem] = useState("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id);
        }
    };
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Effects</h3>
                {effectsList.map((effect) => {
                    return (
                        <EffectItem
                            effect={effect} 
                            key={effect.id}
                            active={activeId === effect.id}
                            onClick={() => handleItemClick(effect.id)}
                        />
                    );
                })}
            </section>
        </div>
    );
}