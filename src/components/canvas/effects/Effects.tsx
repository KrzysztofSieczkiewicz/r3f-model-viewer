import React from 'react';
import { Bloom, DepthOfField, EffectComposer, Glitch } from '@react-three/postprocessing';
import { RenderedBloom } from './RenderedBloom';
import { RenderedDepthOfField } from './RenderedDepthOfField';
import { RenderedGlitch } from './RenderedGlitch';
import { useEffectsContext } from '../../contexts/EffectsContext';
import { EffectWrapper } from '../../../models/Effect';


export const Effects = () => {
    const { effectsList } = useEffectsContext();

    const handleEffectType = (effect: EffectWrapper) => {
        switch (effect.type) {
            case Bloom:
                return <RenderedBloom effect={effect} key={effect.id} />

            case DepthOfField:
                return <RenderedDepthOfField effect={effect} key={effect.id} />

            case Glitch:
                return <RenderedGlitch effect={effect} key={effect.id} />

            default:
                return <></>
        }
    }
        
    return (
        <EffectComposer multisampling={8} autoClear={false}>
            {effectsList.map((effect: EffectWrapper) => {
                return handleEffectType(effect); 
            })}
        </EffectComposer> 
    );

}