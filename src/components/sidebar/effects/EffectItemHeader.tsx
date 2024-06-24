import React from "react";
import styles from '../commons/MenuListItemHeader.module.css';

import { EffectWrapper } from "../../../models/Effect";
import { EffectTypeIcon } from "./EffectTypeIcon";

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
            style={{gridTemplateColumns: '1fr 5fr 1fr'}}
            className={styles.header} 
            onClick={toggleExtend}
        >
            <EffectTypeIcon type={effect.type} />
            <p className={styles.displayName}>{ renderEffectName() }</p>
            <span className={styles.extendIcon}>{ renderArrow() }</span>
        </div>
    );

}