import { Bloom, DepthOfField, Glitch } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';

import { nanoid } from 'nanoid';

// TODO [TUTORING]: HOW TO MAINTAIN A SINGLE MODEL FOR A GROUP OF VERY DIFFERENT TYPES?
// THEY SIGNIFICANTLY VARY IN TERMS OF THE FIELDS CONTAINED

export type EffectWrapper = {
    id: string,
    type: EffectType,
    name: string,
    enabled: boolean

    // BLOOM
    blendFunction: BlendFunction,
    intensity: number,
    luminanceThreshold: number,
    luminanceSmoothing: number

    // DEPTH OF FIELD
    focusDistance: number
    focalLength: number
    bokehScale: number

    // GLITCH
    delay: [number, number],
    duration: [number, number],
    strength: [number, number],
    glitchMode: GlitchMode
    ratio: number
};

export type EffectType = 
    typeof Bloom | 
    typeof DepthOfField |
    typeof Glitch;
    // TODO: ADD BarrelDistortion and Halo


export const INIT_EFFECTS_LIST: EffectWrapper[] = [
    {
        id:nanoid(5),
        type: Bloom,
        name: 'Bloom',
        enabled: false,

        blendFunction: BlendFunction.ADD,
        intensity: 1,
        luminanceThreshold: 0.15,
        luminanceSmoothing: 0.025,

        focusDistance: 0.0035,
        focalLength: 0.01,
        bokehScale: 3,

        delay: [1.5, 3.5],
        duration: [0.6, 1.0],
        strength: [0.3, 1.0],
        glitchMode: GlitchMode.CONSTANT_MILD,
        ratio: 0.85
    },
    {
        id:nanoid(5),
        type: DepthOfField,
        name: 'Depth of Field',
        enabled: false,

        blendFunction: BlendFunction.NORMAL,
        intensity: 1,
        luminanceThreshold: 0.15,
        luminanceSmoothing: 0.025,

        focusDistance: 0.0035,
        focalLength: 0.01,
        bokehScale: 3,

        delay: [1.5, 3.5],
        duration: [0.6, 1.0],
        strength: [0.3, 1.0],
        glitchMode: GlitchMode.CONSTANT_MILD,
        ratio: 0.85
    },
    {
        id:nanoid(5),
        type: Glitch,
        name: 'Glitch',
        enabled: false,

        blendFunction: BlendFunction.NORMAL,
        intensity: 1,
        luminanceThreshold: 0.15,
        luminanceSmoothing: 0.025,

        focusDistance: 0.0035,
        focalLength: 0.01,
        bokehScale: 3,

        delay: [1.5, 3.5],
        duration: [0.6, 1.0],
        strength: [0.1, 0.1],
        glitchMode: GlitchMode.CONSTANT_MILD,
        ratio: 0
    }
]