import { DepthOfField } from '@react-three/postprocessing';
import React from 'react';
import { DepthOfFieldProperties } from '../../../models/Effect';

type Props = {
    properties: DepthOfFieldProperties
}

export const RenderedDepthOfField = ( { properties }: Props) => {

    if (!properties.enabled) return; 
    return (
        <DepthOfField 
            focusDistance={properties.focusDistance} 
            focalLength={properties.focalLength} 
            bokehScale={properties.bokehScale}
            width={1000}
            height={1000}
        />
    );
}