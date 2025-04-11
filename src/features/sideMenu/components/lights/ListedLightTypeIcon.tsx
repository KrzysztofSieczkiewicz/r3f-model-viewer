import React from "react";
import styles from './../common/submenus/Submenu.module.css';
import { LIGHT_TYPES, LightType, } from "../../../../models/Light"

import { ReactComponent as SpotlightIcon } from '../../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../../icons/lightTypes/pointLight.svg';

type Props = {
    type: LightType
}

export const ListedLightTypeIcon = ( {type} :Props ) => {
    return(
    <>
        {type === LIGHT_TYPES.pointLight && <PointLightIcon className={styles.listedItemIcon} />}
        {type === LIGHT_TYPES.spotLight && <SpotlightIcon className={styles.listedItemIcon} />}
    </>
    );
}