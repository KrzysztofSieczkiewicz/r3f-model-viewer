import React from "react";
import styles from './Lights.module.css';
import { LIGHT_TYPES, LightOptions, } from "../../../models/Light"

import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

type Props = {
    type: LightOptions
}

export const LightTypeIcon = ( {type} :Props ) => {
    return(
    <>
        {type === LIGHT_TYPES.pointLight && <PointLightIcon className={styles.lightIcon} />}
        {type === LIGHT_TYPES.spotLight && <SpotlightIcon className={styles.lightIcon} />}
    </>
    );
}