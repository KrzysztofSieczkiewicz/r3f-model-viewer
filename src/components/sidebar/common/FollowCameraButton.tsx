import React, { useEffect, useState } from "react";
import styles from './FollowCameraButton.module.css';
import { ReactComponent as CameraIcon } from './../../../icons/sidebar/camera.svg';
import { useSceneValue } from "../../contexts/SceneContext";

export const FollowCameraButton = () => {
    const [ cameraRotation ] = useSceneValue((value) => value['viewCameraRotation']);

    const [ isTracking, setIsTracking ] = useState(false);

    useEffect(() => {
        if (!isTracking) return;

        console.log(cameraRotation);
    })

    return (
        <button 
            className={isTracking ? `${styles.button} ${styles.enabled}` : styles.button}
            onClick={() => setIsTracking(!isTracking)} >
                <CameraIcon className={styles.icon} />
        </button>
    );
}