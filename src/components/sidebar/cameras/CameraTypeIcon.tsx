import React from "react";
import styles from './Cameras.module.css';

import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { CAMERA_TYPES, CameraTypes } from "../../../models/Camera";

type Props = {
    type: CameraTypes
}

// TODO: ADD PROPER ICONS FOR CAMERAS
export const CameraTypeIcon = ( {type} :Props ) => {
    return(
    <>
        {type === CAMERA_TYPES.perspectiveCamera && <PointLightIcon className={styles.cameraIcon} />}
        {type === CAMERA_TYPES.ortographicCamera && <SpotlightIcon className={styles.cameraIcon} />}
    </>
    );
}