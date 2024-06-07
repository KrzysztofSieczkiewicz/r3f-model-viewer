import React from "react";
import styles from '../Sidebar.module.css';

import { useState } from "react";
import { useCamerasContext } from "../../contexts/CamerasContext";
import { CameraWrapper } from "../../../models/Camera";
import { CameraItem } from "./CameraItem";
import { AddCameraDropdown } from "./AddCameraDropdown";


export const CamerasMenu = () => {
    const { camerasList } = useCamerasContext();
   
    const [activeId, setActiveItem] = useState("");

    const toggleItemExtension = (id: string) => {
        if (activeId === id) {
            setActiveItem("");
        } else {
            setActiveItem(id)
        }
    };
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <AddCameraDropdown />
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Cameras</h3>
                
                {camerasList.map((camera: CameraWrapper) => {
                    return (
                        <CameraItem
                            key={camera.id}
                            isActive={activeId === camera.id}
                            camera={camera}

                            toggleExtend={() => toggleItemExtension(camera.id)}
                        />
                    );
                })}

            </section>
        </div>
    );
}