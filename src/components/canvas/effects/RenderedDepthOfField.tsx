import { DepthOfField } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../../models/Effect';

type Props = {
    effect: EffectWrapper
}

export const RenderedDepthOfField = ( { effect }: Props) => {

    if (!effect.enabled) return; 
    return (
        <DepthOfField 
            focusDistance={effect.focusDistance} 
            focalLength={effect.focalLength} 
            bokehScale={effect.bokehScale}
            width={1000}
            height={1000}
        />
    );
}