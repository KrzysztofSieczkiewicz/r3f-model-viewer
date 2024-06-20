import React from 'react';

import { EFFECT_TYPES, EffectWrapper } from '../../../models/Effect';
import { BloomControls } from './controlsTypes/BloomControls';
import { DepthOfFieldControls } from './controlsTypes/DepthOfFieldControls';
import { GlitchControls } from './controlsTypes/GlitchControls';
import { EffectItemHeader } from './EffectItemHeader';
import { MenuListItem } from '../commons/MenuListItem';


type Props = {
    isActive: boolean,
    effect: EffectWrapper
    toggleExtend: () => void
}

export const EffectItem = ( {isActive, effect, toggleExtend}: Props) => {

    const renderEffectHeader = () => {
        return <EffectItemHeader effect={effect} isActive={isActive} toggleExtend={() => toggleExtend()} />
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
        <MenuListItem isActive={isActive}>
            {renderEffectHeader()}
            {isActive && renderEffectControls()}
        </MenuListItem>
    );
}