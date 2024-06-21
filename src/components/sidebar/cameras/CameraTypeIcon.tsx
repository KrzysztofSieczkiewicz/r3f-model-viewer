import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';

import { ReactComponent as CameraIcon } from '../../../icons/sidebar/camera.svg';

// TODO: ADD PROPER ICONS FOR CAMERAS
export const CameraTypeIcon = () => {
    return(
        <CameraIcon className={styles.typeIcon} />
    );
}