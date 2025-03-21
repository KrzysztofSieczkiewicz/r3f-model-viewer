import React, { useEffect, useRef, useState } from "react";
import styles from './DropdownAddCamera.module.css';
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { CAMERA_TYPES } from "../../../../models/Camera";


export const DropdownAddCamera = () => {
    const [ isActive, setIsActive ] = useState(false);

    const { addCamera } = useSceneObjectsContext();

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
                            addCamera(CAMERA_TYPES.perspectiveCamera);
                            setIsActive(false);
                        }}
                        className={styles.cameraButton}>
                        Perspective Camera
                    </button>
                </li>
                <li className={styles.listElement}>
                    <button 
                        onClick={() => {
                            addCamera(CAMERA_TYPES.ortographicCamera);
                            setIsActive(false);
                        }}
                        className={styles.cameraButton}>
                        Ortographic Camera
                    </button>
                </li>
            </ul>}
        </div>
    );
}