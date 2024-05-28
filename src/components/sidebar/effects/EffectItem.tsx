import React from 'react';
import styles from './Effects.module.css'

import { EFFECT_TYPES, EffectWrapper } from '../../../models/Effect';
import { BloomControls } from './controlsTypes/BloomControls';
import { DepthOfFieldControls } from './controlsTypes/DepthOfFieldControls';
import { GlitchControls } from './controlsTypes/GlitchControls';
import { EffectItemHeader } from './EffectItemHeader';


type Props = {
    active: boolean,
    effect: EffectWrapper
    toggleExtend: () => void
}

export const EffectItem = ( {active, effect, toggleExtend}: Props) => {

    const renderEffectHeader = () => {
        return <EffectItemHeader effect={effect} isActive={active} toggleExtend={() => toggleExtend()} />
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
            {renderEffectHeader()}
            {active && renderEffectControls()}
        </div>
    );
}