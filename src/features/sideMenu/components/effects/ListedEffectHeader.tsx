import React from "react";
import styles from './../common/submenu/Submenu.module.css';

import { EffectWrapper } from "../../../../models/Effect";
import { ListedEffectTypeIcon } from "./ListedEffectTypeIcon";

type Props = {
    effect: EffectWrapper,
    isActive: boolean,
    toggleExtend: () => void
}

export const ListedEffectHeader = ( {effect, isActive, toggleExtend}: Props) => {

    const renderEffectName = () => {
        return effect.type;
    }

    const renderArrow = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div 
            style={{gridTemplateColumns: '1fr 5fr 1fr'}}
            className={styles.listedItemHeader} 
            onClick={toggleExtend}
        >
            <ListedEffectTypeIcon type={effect.type} />
            <p className={styles.listedItemDisplayName}>{ renderEffectName() }</p>
            <span className={styles.listedItemExtendIcon}>{ renderArrow() }</span>
        </div>
    );

}