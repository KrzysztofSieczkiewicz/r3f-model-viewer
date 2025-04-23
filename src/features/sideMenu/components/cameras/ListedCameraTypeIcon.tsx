import React from "react";
import styles from './../common/submenus/Submenu.module.css';

import { ReactComponent as CameraIcon } from '../../../../icons/sidebar/camera.svg';

// TODO: ADD PROPER ICONS FOR CAMERAS
export const ListedCameraTypeIcon = () => {
    return(
        <CameraIcon className={styles.listedItemIcon} />
    );
}