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

    blendfunction: BlendFunction,
    intensity: number,
    width: number,
    height: number,
    kernelSize: number,
    luminanceThreshold: number,
    luminanceSmoothing: number
};

type EffectType = 
    typeof Bloom | 
    typeof ChromaticAberration |
    typeof DepthOfField;


export const INIT_EFFECTS_LIST: EffectWrapper[] = [
        {
            id:nanoid(5),
            type: Bloom,
            name: 'Bloom',
            enabled: true,

            blendfunction: BlendFunction.ADD,
            intensity: 1,
            width: 300,
            height: 300,
            kernelSize: 5,
            luminanceThreshold: 0.15,
            luminanceSmoothing: 0.025
        }
      ]