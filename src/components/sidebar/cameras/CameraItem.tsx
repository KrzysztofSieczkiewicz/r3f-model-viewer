import React from 'react';
import styles from './Cameras.module.css';

import { CameraWrapper } from "../../../models/Camera"
import { useCamerasContext } from '../../contexts/CamerasContext';
import { DeleteItemButton } from '../common/DeleteItemButton';


type Props = {
    isActive: boolean,
    camera: CameraWrapper,

    toggleExtend: () => void,
}

export const CameraItem = ( {isActive, camera, toggleExtend}: Props ) => {
    const { deleteCamera } = useCamerasContext();
    
    return (
        <div className={isActive ? `${styles.cameraContainer} ${styles.active}` : styles.cameraContainer}>

            {isActive &&
            <div className={styles.cameraBody}>
                <DeleteItemButton deleteObject={() => deleteCamera(camera.id)}/>
            </div>
            }

        </div>
    );
}