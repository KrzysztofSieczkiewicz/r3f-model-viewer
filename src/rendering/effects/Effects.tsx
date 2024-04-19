import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../models/Effect';
import { RenderedBloomEffect } from './RenderedBloomEffect';
import { RenderedDepthOfField } from './RenderedDepthOfField';

type Props = {
    effectsList: EffectWrapper[]
}

export const Effects = ({ effectsList }: Props) => {

    const handleEffectType = (effect: EffectWrapper) => {
        switch (effect.type) {
            case Bloom:
                return <RenderedBloomEffect effect={effect} />

            case DepthOfField:
                return <RenderedDepthOfField effect={effect} />

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