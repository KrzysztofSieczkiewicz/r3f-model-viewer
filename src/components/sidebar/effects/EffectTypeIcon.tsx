import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';

import { ReactComponent as PointLightIcon } from './../../../icons/lightTypes/pointLight.svg';
import { EffectTypes } from "../../../models/Effect";

type Props = {
    type: EffectTypes;
}

// TODO: INTRODUCE PROPER EFFECT ICONS
export const EffectTypeIcon = ( {type}: Props) => {
    return (
        <PointLightIcon className={styles.typeIcon} />
    );
}