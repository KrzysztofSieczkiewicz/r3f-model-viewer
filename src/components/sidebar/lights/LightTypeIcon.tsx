import React from "react";
import styles from './Lights.module.css';
import { LIGHT_TYPES, LightWrapper } from "../../../models/Light"

import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

type Props = {
    light: LightWrapper
}

export const LightTypeIcon = ( {light} :Props ) => {
    return(
    <>
        {light.type === LIGHT_TYPES.pointLight && <PointLightIcon className={styles.lightIcon} />}
        {light.type === LIGHT_TYPES.spotLight && <SpotlightIcon className={styles.lightIcon} />}
    </>
    );
}