import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../contexts/EffectsContext';
import styles from './../Sidebar.module.css';

import { EffectItem } from './EffectItem';
import { EffectTypes } from '../../../models/Effect';



export const EffectsMenu = () => {
    const { effectsList } = useEffectsContext();
   
    const [activeId, setActiveItem] = useState("");

    const handleItemClick = (type: EffectTypes) => {
        if (activeId === type) {
            setActiveItem("");
        } else {
            setActiveItem(type);
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
                            toggleExtend={() => handleItemClick(effect.type)}
                        />
                    );
                })}
            </section>
        </div>
    );
}