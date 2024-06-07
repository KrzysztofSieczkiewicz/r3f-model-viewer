import React from 'react';
import styles from './Cameras.module.css';

import { CAMERA_TYPES, CameraWrapper } from "../../../models/Camera"
import { useCamerasContext } from '../../contexts/CamerasContext';
import { DeleteItemButton } from '../common/DeleteItemButton';
import { PerspectiveCameraControls } from './controlsTypes/PersperctiveCameraControls';
import { OrtogtaphicCameraControls } from './controlsTypes/OrtographicCameraControls';
import { CameraItemHeader } from './CameraItemHeader';


type Props = {
    isActive: boolean,
    camera: CameraWrapper,

    toggleExtend: () => void,
}

export const CameraItem = ( {isActive, camera, toggleExtend}: Props ) => {
    const { deleteCamera } = useCamerasContext();

    const renderCameraHeader = () => {
        return <CameraItemHeader isActive={isActive} camera={camera} toggleExtend={() => toggleExtend()} />
    }

    const renderCameraControls = () => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <PerspectiveCameraControls id={camera.id} properties={camera.properties} />
            case CAMERA_TYPES.ortographicCamera:
                return <OrtogtaphicCameraControls id={camera.id} properties={camera.properties} />
        }
    }
    
    return (
        <div className={isActive ? `${styles.cameraContainer} ${styles.active}` : styles.cameraContainer}>
            
            {renderCameraHeader()}
            
            {isActive &&
            <div className={styles.cameraBody}>
                <DeleteItemButton deleteObject={() => deleteCamera(camera.id)}/>
                {renderCameraControls()}
            </div>
            }
        </div>
    );
}