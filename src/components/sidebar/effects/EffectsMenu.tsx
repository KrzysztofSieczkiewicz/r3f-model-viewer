import React from 'react';
import { useState } from 'react';
import { useEffectsContext } from '../../contexts/EffectsContext';
import styles from './../Sidebar.module.css';

import { EffectItem } from './EffectItem';
import { EffectTypes } from '../../../models/Effect';
import { AddEffectDropdown } from './AddEffectDropdown';



export const EffectsMenu = () => {
    const { effectsList } = useEffectsContext();
   
    const [activeEffect, setActiveEffect] = useState<EffectTypes | null>(null);

    const handleItemClick = (type: EffectTypes) => {
        if (activeEffect === type) {
            setActiveEffect(null);
        } else {
            setActiveEffect(type);
        }
    };
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <AddEffectDropdown />
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Effects</h3>
                {effectsList.map((effect) => {
                    return (
                        <EffectItem
                            key={effect.type}
                            effect={effect}
                            active={activeEffect === effect.type}
                            toggleExtend={() => handleItemClick(effect.type)}
                        />
                    );
                })}
            </section>
        </div>
    );
}