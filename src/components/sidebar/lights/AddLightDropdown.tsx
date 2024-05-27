import React, { useEffect, useState } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import styles from './AddLightDropdown.module.css';
import { DEFAULT_POINTLIGHT, DEFAULT_SPOTLIGHT } from "../../../models/Light";


type Props = {

}

export const AddLightDropdown = () => {
    const [ isActive, setIsActive ] = useState(false);

    const { addLight } = useSceneObjectsContext();

    useEffect(() => {

    }, [isActive]);

    return (
        <>
            <button className={styles.mainButton} onClick={() => setIsActive(!isActive)}> ADD NEW </button>
            {isActive && 
            <ul className={styles.list}>
                <li className={styles.listElement}>
                    <button 
                        onClick={() => addLight(DEFAULT_POINTLIGHT)}
                        className={styles.lightButton}>
                        Point Light
                    </button>
                </li>
                <li className={styles.listElement}>
                    <button 
                        onClick={() => addLight(DEFAULT_SPOTLIGHT)}
                        className={styles.lightButton}>
                        Spot Light
                    </button>
                </li>
            </ul>}
        </>
    );
}