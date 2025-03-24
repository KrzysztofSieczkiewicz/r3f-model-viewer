import React from "react";
import styles from './../common/submenu/Submenu.module.css';

import { ReactComponent as PointLightIcon } from '../../../../icons/lightTypes/pointLight.svg';
import { EffectType } from "../../../../models/Effect";

type Props = {
    type: EffectType;
}

// TODO: INTRODUCE PROPER EFFECT ICONS
export const ListedEffectTypeIcon = ( {type}: Props) => {
    return (
        <PointLightIcon className={styles.listedItemIcon} />
    );
}