import React from 'react';
import { GlitchProperties } from '../../../models/Effect';
import { Glitch } from '@react-three/postprocessing';
import { Vector2 } from 'three';

type Props = {
    properties: GlitchProperties
}

export const RenderedGlitch = ( { properties }: Props) => {

    if (!properties.enabled) return; 
    return (
        <Glitch 
            mode={properties.glitchMode}
            duration={new Vector2(...properties.duration)}
            delay={new Vector2(...properties.delay)}
            strength={new Vector2(...properties.strength)}
            active={properties.enabled}
        />
    );
}