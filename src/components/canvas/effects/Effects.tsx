import React from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { RenderedBloom } from './RenderedBloom';
import { RenderedDepthOfField } from './RenderedDepthOfField';
import { RenderedGlitch } from './RenderedGlitch';
import { useEffectsContext } from '../../contexts/EffectsContext';
import { EFFECT_TYPES, EffectWrapper } from '../../../models/Effect';


export const Effects = () => {
    const { effectsList } = useEffectsContext();

    const handleEffectType = (effect: EffectWrapper) => {
        switch (effect.type) {
            case EFFECT_TYPES.bloom:
                return <RenderedBloom properties={effect.properties} key={effect.type} />

            case EFFECT_TYPES.depthOfField:
                return <RenderedDepthOfField properties={effect.properties} key={effect.type} />

            case EFFECT_TYPES.glitch:
                return <RenderedGlitch properties={effect.properties} key={effect.type} />

            default:
                return <></>
        }
    }

    const activeEffects = effectsList.filter(effect => effect.properties.enabled);
    if (!activeEffects.length) return;
    return (
        <EffectComposer multisampling={8} autoClear={false}>
            <>
                {effectsList.map((effect: EffectWrapper) => {
                    return handleEffectType(effect); 
                })}
            </>
        </EffectComposer> 
    );

}