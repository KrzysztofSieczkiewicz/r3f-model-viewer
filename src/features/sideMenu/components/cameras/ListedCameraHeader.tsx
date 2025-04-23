import React from "react";
import styles from './../common/submenus/Submenu.module.css';

import { CameraWrapper } from "../../../../models/Camera";
import { ButtonToggleVisibility } from "../common/controls/ButtonToggleVisibility";
import { ListedCameraTypeIcon } from "./ListedCameraTypeIcon";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";

type Props = {
    isActive: boolean,
    camera: CameraWrapper
    
    toggleExtend: () => void,
}

export const ListedCameraHeader = ( {isActive, camera, toggleExtend }: Props) => {
    const { updateCameraProperties } = useSceneObjectsContext();

    const { isVisible } = camera.properties;

    const handleArrowDirection = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    // TODO: ADD DISPLAY NAME PROPERTY + HANDLING
    return (
        <div
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr'}}
            className={styles.listedItemHeader} 
            onClick={toggleExtend} 
        >
            <ListedCameraTypeIcon />
            <p className={styles.listedItemDisplayName}>Camera</p>
            <ButtonToggleVisibility 
                isVisible={isVisible}
                updateObject={ (val) => updateCameraProperties(camera.id, {isVisible: val} )}  />
            <span className={styles.listedItemExtendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}