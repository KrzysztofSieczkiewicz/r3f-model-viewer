import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './AddEffectDropdown.module.css';
import { useEffectsContext } from "../../contexts/EffectsContext";

import { EFFECT_TYPES, EffectTypes } from "../../../models/Effect";

const useEffects = () => {
    const { effectsList, addEffect } = useEffectsContext();

    const possibleEffects = Object.keys(EFFECT_TYPES).filter((v) => isNaN(Number(v))) as EffectTypes[];
    const existingEffects = effectsList.map((effect) => effect.type);
    const availableEffects = useMemo(() => possibleEffects.filter((type) => existingEffects.indexOf(type) < 0), [possibleEffects, existingEffects]);
    
    return { availableEffects, addEffect };
};

export const AddEffectDropdown = () => {
    const [ isActive, setIsActive ] = useState(false);

    const { availableEffects, addEffect } = useEffects();

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const handleClickOutside = (e :MouseEvent) => {
        if(!isActive) return;
        if(buttonRef.current?.contains(e.target as Node)) return;
        if(listRef.current?.contains(e.target as Node)) return;
        
        setIsActive(false);
    };

    // TODO: GREY OUT BUTTON IF EFFECT IS ALREADY IN THE SCENE
    const renderEffectButton = (type: EffectTypes) => {
        const displayName = EFFECT_TYPES[type as unknown as keyof typeof EFFECT_TYPES]
        return (
            <li className={styles.listElement} key={type}>
                <button className={styles.lightButton}
                    onClick={() => {
                        addEffect(displayName);
                        setIsActive(false); }}
                    >
                        {displayName}
                </button>
            </li>
        );
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isActive, buttonRef]);

    return (
        <div className={styles.buttonContainer}>
            <button ref={buttonRef} className={styles.mainButton} onClick={() => setIsActive(!isActive)}> ADD NEW </button>
            
            {isActive &&
            <ul ref={listRef} className={styles.list}>
                {availableEffects.map((effectType) => renderEffectButton(effectType))}
            </ul>}
        </div>
    );
}