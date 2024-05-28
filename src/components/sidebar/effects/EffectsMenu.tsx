import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../contexts/EffectsContext';
import styles from './../Sidebar.module.css';

import { EffectItem } from './EffectItem';



export const EffectsMenu = () => {
    const { effectsList } = useEffectsContext();
   
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
                            key={effect.type}
                            effect={effect}
                            active={activeId === effect.type}
                            onClick={() => handleItemClick(effect.type)}
                        />
                    );
                })}
            </section>
        </div>
    );
}