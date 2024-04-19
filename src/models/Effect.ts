import { Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
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
};

export type EffectType = 
    typeof Bloom | 
    typeof ChromaticAberration |
    typeof DepthOfField;


export const INIT_EFFECTS_LIST: EffectWrapper[] = [
    {
        id:nanoid(5),
        type: Bloom,
        name: 'Bloom',
        enabled: true,

        blendFunction: BlendFunction.ADD,
        intensity: 1,
        luminanceThreshold: 0.15,
        luminanceSmoothing: 0.025,

        focusDistance: 0.0035,
        focalLength: 0.01,
        bokehScale: 3,
    },
    {
        id:nanoid(5),
        type: DepthOfField,
        name: 'Depth of Field',
        enabled: true,

        blendFunction: BlendFunction.NORMAL,
        intensity: 1,
        luminanceThreshold: 0.15,
        luminanceSmoothing: 0.025,

        focusDistance: 0.0035,
        focalLength: 0.01,
        bokehScale: 3,
    }
]