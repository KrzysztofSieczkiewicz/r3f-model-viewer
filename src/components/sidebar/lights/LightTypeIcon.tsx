import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';
import { LIGHT_TYPES, LightTypes, } from "../../../models/Light"

import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

type Props = {
    type: LightTypes
}

export const LightTypeIcon = ( {type} :Props ) => {
    return(
    <>
        {type === LIGHT_TYPES.pointLight && <PointLightIcon className={styles.typeIcon} />}
        {type === LIGHT_TYPES.spotLight && <SpotlightIcon className={styles.typeIcon} />}
    </>
    );
}