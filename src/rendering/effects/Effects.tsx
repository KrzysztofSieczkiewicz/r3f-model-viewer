import { Bloom, DepthOfField, EffectComposer, Glitch } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../models/Effect';
import { RenderedBloom } from './RenderedBloom';
import { RenderedDepthOfField } from './RenderedDepthOfField';
import { RenderedGlitch } from './RenderedGlitch';

type Props = {
    effectsList: EffectWrapper[]
}

export const Effects = ({ effectsList }: Props) => {

    const handleEffectType = (effect: EffectWrapper) => {
        switch (effect.type) {
            case Bloom:
                return <RenderedBloom effect={effect} />

            case DepthOfField:
                return <RenderedDepthOfField effect={effect} />

            case Glitch:
                return <RenderedGlitch effect={effect} />

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