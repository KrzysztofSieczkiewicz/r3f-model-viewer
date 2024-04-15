import { Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';

// TODO [TUTORING]: HOW TO MAINTAIN A SINGLE MODEL FOR A GROUP OF VERY DIFFERENT TYPES?
// THEY SIGNIFICANTLY VARY IN TERMS OF THE FIELDS CONTAINED

export type EffectWrapper = {
    id: string,
    type: EffectType
}

type EffectType = 
    typeof Bloom | 
    typeof ChromaticAberration |
    typeof DepthOfField;

