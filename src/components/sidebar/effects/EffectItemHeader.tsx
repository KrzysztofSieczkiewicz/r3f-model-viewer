import React from "react";
import styles from './EffectItemHeader.module.css';

import { ReactComponent as PointLightIcon } from './../../../icons/lightTypes/pointLight.svg';
import { EffectWrapper } from "../../../models/Effect";

type Props = {
    effect: EffectWrapper,
    isActive: boolean,
    toggleExtend: () => void
}

export const EffectItemHeader = ( {effect, isActive, toggleExtend}: Props) => {

    const renderEffectName = () => {
        return effect.type;
    }

    const renderArrow = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div 
            className={styles.effectHeader} 
            onClick={toggleExtend}
        >
            <PointLightIcon className={styles.effectIcon} />
            <p className={styles.effectName}>{ renderEffectName() }</p>
            <span className={styles.extendIcon}>{ renderArrow() }</span>
        </div>
    );

}