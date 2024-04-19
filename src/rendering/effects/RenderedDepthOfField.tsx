import { DepthOfField } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../models/Effect';

type Props = {
    effect: EffectWrapper
}

// TODO: FIND CORRECT VALUES FOR DEFAULT AND HANDLING
// TODO: MAYBE SOME HELPERS TO DISPLAY?
export const RenderedDepthOfField = ( { effect }: Props) => {

    return (
        <DepthOfField 
            focusDistance={effect.focusDistance} 
            focalLength={effect.focalLength} 
            bokehScale={effect.bokehScale}
            width={480}
            height={480}
        /> 
    );
}