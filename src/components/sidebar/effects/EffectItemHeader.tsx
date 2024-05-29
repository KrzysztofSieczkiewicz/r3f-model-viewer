import React from "react";
import styles from './Effects.module.css';

import { ReactComponent as PointLightIcon } from './../../../icons/lightTypes/pointLight.svg';
import { EffectWrapper } from "../../../models/Effect"
import { VisibilityButton } from "../common/VisibilityButton";
import { useEffectsContext } from "../../contexts/EffectsContext";

type Props = {
    effect: EffectWrapper,
    isActive: boolean,

    toggleExtend: () => void
}

export const EffectItemHeader = ( {effect, isActive, toggleExtend}: Props) => {
    const { updateEffectProperties } = useEffectsContext();

    const { enabled } = effect.properties;

    const renderEffectName = () => {
        return effect.type;
    }

    const renderArrow = () => {
        return isActive ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={styles.effectHeader} onClick={toggleExtend}>
            <PointLightIcon className={styles.effectIcon} />
            <p className={styles.effectName}>{ renderEffectName() }</p>
            
            <VisibilityButton 
                isVisible={enabled}
                updateObject={ (val) => updateEffectProperties(effect.type, {enabled: val} )} 
            />
            <span className={styles.extendIcon}>{ renderArrow() }</span>
        </div>
    );

}