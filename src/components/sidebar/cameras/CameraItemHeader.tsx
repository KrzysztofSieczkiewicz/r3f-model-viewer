import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';

import { CameraWrapper } from "../../../models/Camera";
import { VisbilityEyeToggle } from "../common/VisbilityEyeToggle";
import { CameraTypeIcon } from "./CameraTypeIcon";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

type Props = {
    isActive: boolean,
    camera: CameraWrapper
    
    toggleExtend: () => void,
}

export const CameraItemHeader = ( {isActive, camera, toggleExtend }: Props) => {
    const { updateCameraProperties } = useSceneObjectsContext();

    const { isVisible } = camera.properties;

    const handleArrowDirection = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    // TODO: ADd DISPLAY NAME PROPERTY + HANDLING
    return (
        <div
            style={{gridTemplateColumns: '1fr 5fr 1fr 1fr'}}
            className={styles.header} 
            onClick={toggleExtend} 
        >
            <CameraTypeIcon />
            <p className={styles.displayName}>Camera</p>
            <VisbilityEyeToggle 
                isVisible={isVisible}
                updateObject={ (val) => updateCameraProperties(camera.id, {isVisible: val} )}  />
            <span className={styles.extendIcon}>{ handleArrowDirection() }</span>
        </div>
    );
}