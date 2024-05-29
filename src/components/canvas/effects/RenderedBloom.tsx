import { Bloom } from '@react-three/postprocessing';
import React from 'react';
import { BloomProperties } from '../../../models/Effect';

type Props = {
    properties: BloomProperties
}

export const RenderedBloom = ( { properties }: Props) => {

    if (!properties.enabled) return; 
    return (
        <Bloom 
            blendFunction={properties.blendFunction}
            intensity={properties.intensity}
            width={1000}
            height={1000}
            kernelSize={5}
            luminanceThreshold={properties.luminanceThreshold}
            luminanceSmoothing={properties.luminanceSmoothing}
        /> 
    );
}