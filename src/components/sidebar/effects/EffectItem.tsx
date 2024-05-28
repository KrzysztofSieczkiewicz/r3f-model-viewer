import React from 'react';
import styles from './Effects.module.css'

import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';

import { EFFECT_TYPES, EffectWrapper } from '../../../models/Effect';
import { BloomControls } from './controlsTypes/BloomControls';
import { DepthOfFieldControls } from './controlsTypes/DepthOfFieldControls';
import { GlitchControls } from './controlsTypes/GlitchControls';


type Props = {
    active: boolean,
    effect: EffectWrapper
    onClick: () => void
}

export const EffectItem = ( {active, effect, onClick}: Props) => {

    const handleEffectName = () => {
        return effect.type.charAt(0).toUpperCase() + effect.type.slice(1);
    }

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    const renderEffectControls = () => {
        switch(effect.type) {
            case EFFECT_TYPES.bloom:
                return <BloomControls properties={effect.properties} />;
            case EFFECT_TYPES.depthOfField:
                return <DepthOfFieldControls properties={effect.properties} />;
            case EFFECT_TYPES.glitch:
                return <GlitchControls properties={effect.properties} />;
        }
    }

    return (
        <div className={active ? `${styles.effectContainer} ${styles.active}` : styles.effectContainer}>
            <div className={styles.effectHeader}
                onClick={onClick}
            >
                <PointLightIcon className={styles.effectIcon} />
                <p className={styles.effectName}>{ handleEffectName() }</p>
                <span className={styles.extendIcon}>{ handleIsActive() }</span>
            </div>
            {active && renderEffectControls()}
        </div>
    );
}