import { Bloom } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../../models/Effect';

type Props = {
    effect: EffectWrapper
}

export const RenderedBloom = ( { effect }: Props) => {

    return (
        <Bloom 
            blendFunction={effect.blendFunction}
            intensity={effect.enabled ? effect.intensity : 0}
            width={1000}
            height={1000}
            kernelSize={5}
            luminanceThreshold={effect.luminanceThreshold}
            luminanceSmoothing={effect.luminanceSmoothing}
        /> 
    );
}