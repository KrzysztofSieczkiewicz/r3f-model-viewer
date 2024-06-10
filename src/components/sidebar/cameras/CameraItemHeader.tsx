import React from "react";
import styles from './Cameras.module.css';

import { CameraWrapper } from "../../../models/Camera";
import { useCamerasContext } from "../../contexts/CamerasContext";
import { VisibilityButton } from "../common/VisibilityButton";
import { CameraTypeIcon } from "./CameraTypeIcon";

type Props = {
    isActive: boolean,
    camera: CameraWrapper
    
    toggleExtend: () => void,
}

export const CameraItemHeader = ( {isActive, camera, toggleExtend }: Props) => {
    const { updateCameraProperties, } = useCamerasContext();

    const { isVisible } = camera.properties;

    const renderArrow = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    // TODO: ADd DISPLAY NAME PROPERTY + HANDLING
    return (
        <div className={styles.cameraHeader} onClick={toggleExtend} >
            <CameraTypeIcon type={camera.type} />
            <p> CAMERA </p>
            <VisibilityButton 
                isVisible={isVisible}
                updateObject={ (val) => updateCameraProperties(camera.id, {isVisible: val} )}  />
            <span className={styles.extendIcon}>{ renderArrow() }</span>
        </div>
    );
}