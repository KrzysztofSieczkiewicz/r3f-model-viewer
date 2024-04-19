import { Bloom } from '@react-three/postprocessing';
import React from 'react';
import { EffectWrapper } from '../../models/Effect';

type Props = {
    effect: EffectWrapper
}

export const RenderedBloomEffect = ( { effect }: Props) => {

    return (
        <Bloom 
            blendFunction={effect.blendFunction}
            intensity={effect.enabled ? effect.intensity : 0}
            width={1000} // TODO: MOVE THIS TO GLOBAL CONSTANT RELATED TO RENDERING
            height={1000} // TODO: MOVE THIS TO GLOBAL CONSTANT RELATED TO RENDERING
            kernelSize={5} // TODO: MOVE THIS TO GLOBAL CONSTANT RELATED TO RENDERING
            luminanceThreshold={effect.luminanceThreshold}
            luminanceSmoothing={effect.luminanceSmoothing}
        /> 
    );
}