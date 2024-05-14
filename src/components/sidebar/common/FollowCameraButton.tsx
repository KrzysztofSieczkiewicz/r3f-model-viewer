import React, { useEffect, useState } from "react";
import styles from './FollowCameraButton.module.css';
import { ReactComponent as CameraIcon } from './../../../icons/sidebar/camera.svg';
import { useSceneValue } from "../../contexts/SceneContext";
import { radianToDeg } from "../../../utils/mathUtil";

type Props = {
    handleUpdate: (newRotation: [number, number, number]) => void 
}

export const FollowCameraButton = ({ handleUpdate }: Props) => {
    const [ cameraRotation ] = useSceneValue((value) => value['viewCameraRotation']);

    const [ currentRotation, setCurrentRotation ] = useState(cameraRotation)
    const [ isTracking, setIsTracking ] = useState(false);

    useEffect(() => {
        if (!isTracking) return;

        const rotationDelta = [
            cameraRotation[0] - currentRotation[0],
            cameraRotation[1] - currentRotation[1],
            cameraRotation[2] - currentRotation[2]
        ] as [number, number, number];

        handleUpdate(rotationDelta);
        setCurrentRotation(cameraRotation);

    }, [cameraRotation] )

    return (
        <button 
            className={isTracking ? `${styles.button} ${styles.enabled}` : styles.button}
            onClick={() => setIsTracking(!isTracking)} >
                <CameraIcon className={styles.icon} />
        </button>
    );
}