import React from "react";
import styles from './../common/submenus/Submenu.module.css';
import { LIGHT_TYPES, LightType, } from "../../../../models/Light"

import { ReactComponent as PointLightIcon } from '../../../../icons/lightTypes/pointLight.svg';
import { ReactComponent as SpotlightIcon } from '../../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as DirectionalLightIcon } from '../../../../icons/lightTypes/directionalLight.svg';

type Props = {
    type: LightType
}

export const ListedLightTypeIcon = ( {type} :Props ) => {

    const renderLightTypeIcon = (lightType: LightType) => {
        switch (lightType) {
            case LIGHT_TYPES.pointLight:
                return <PointLightIcon className={styles.listedItemIcon} />

            case LIGHT_TYPES.spotLight:
                return <SpotlightIcon className={styles.listedItemIcon} />

            case LIGHT_TYPES.directionalLight:
                return <DirectionalLightIcon className={styles.listedItemIcon} />
            
            default:
                // TODO: replace with more generic icon used for fallback
                // preferably name it DefaultLightIcon or FallbackLightIcon
                return <PointLightIcon className={styles.listedItemIcon} />
        }
    }
    return(
    <>
        {renderLightTypeIcon(type)}
    </>
    );
}