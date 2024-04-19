import { DepthOfField } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../models/Effect';

type Props = {
    effect: EffectWrapper
}

export const RenderedDepthOfField = ( { effect }: Props) => {

    return (
        <DepthOfField 
            focusDistance={0.0035} 
            focalLength={0.01} 
            bokehScale={3} 
        /> 
    );
}