import React from 'react';
import { EffectWrapper } from '../../models/Effect';
import { Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing'
import { Vector2 } from 'three';

type Props = {
    effect: EffectWrapper
}

export const RenderedGlitch = ( { effect }: Props) => {

    return (
        <Glitch 
            mode={effect.glitchMode}
            duration={new Vector2(...effect.duration)}
            delay={new Vector2(...effect.delay)}
            strength={new Vector2(...effect.strength)}
            ratio={effect.ratio}
        />
    );
}