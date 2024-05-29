import React, { useEffect, useRef, useState } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import styles from './AddLightDropdown.module.css';
import { DEFAULT_POINTLIGHT, DEFAULT_SPOTLIGHT } from "../../../models/Light";


export const AddLightDropdown = () => {
    const [ isActive, setIsActive ] = useState(false);

    const { addLight } = useSceneObjectsContext();

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const handleClickOutside = (e :MouseEvent) => {
        if(!isActive) return;
        if(!buttonRef.current) return;
        if(buttonRef.current.contains(e.target as Node)) return;
        if(listRef.current?.contains(e.target as Node)) return;
        
        setIsActive(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isActive, buttonRef]);

    return (
        <div className={styles.buttonContainer}>
            <button ref={buttonRef} className={styles.mainButton} onClick={() => setIsActive(!isActive)}> ADD NEW </button>
            
            {isActive &&
            <ul ref={listRef} className={styles.list}>
                <li className={styles.listElement}>
                    <button 
                        onClick={() => {
                            addLight(DEFAULT_POINTLIGHT);
                            setIsActive(false);
                        }}
                        className={styles.lightButton}>
                        Point Light
                    </button>
                </li>
                <li className={styles.listElement}>
                    <button 
                        onClick={() => {
                            addLight(DEFAULT_SPOTLIGHT);
                            setIsActive(false);
                        }}
                        className={styles.lightButton}>
                        Spot Light
                    </button>
                </li>
            </ul>}
        </div>
    );
}