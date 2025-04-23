import { BlendFunction, GlitchMode } from "postprocessing";

// TODO: ADD BarrelDistortion and Halo
export enum EFFECT_TYPES {
    bloom = "Bloom",
    depthOfField = "Depth of Field",
    glitch = "Glitch",
};
export type EffectType = typeof EFFECT_TYPES[keyof typeof EFFECT_TYPES];

type CommonProperties = {
    enabled: boolean,
}

export type BloomProperties = {
    blendFunction: BlendFunction,
    intensity: number,
    luminanceThreshold: number,
    luminanceSmoothing: number
} & CommonProperties;

export type DepthOfFieldProperties = {
    focusDistance: number
    focalLength: number
    bokehScale: number
} & CommonProperties;

export type GlitchProperties = {
    glitchMode: GlitchMode
    delay: [number, number],
    duration: [number, number],
    strength: [number, number]
} & CommonProperties

export type EffectProperties = BloomProperties | DepthOfFieldProperties | GlitchProperties;

export type EffectWrapper = 
  { type: EFFECT_TYPES.bloom, properties: BloomProperties } | 
  { type: EFFECT_TYPES.depthOfField, properties: DepthOfFieldProperties } |
  { type: EFFECT_TYPES.glitch, properties: GlitchProperties }
;

export const INIT_EFFECTS_LIST: EffectWrapper[] = [
    
]

const DEFAULT_BLOOM_EFFECT: EffectWrapper = {
    type: EFFECT_TYPES.bloom,
    properties: {
        enabled: true,
        blendFunction: BlendFunction.ADD,
        intensity: 1,
        luminanceThreshold: 0.15,
        luminanceSmoothing: 0.025,
    }
}

const DEFAULT_DOF_EFFECT: EffectWrapper = {
    type: EFFECT_TYPES.depthOfField,
    properties: {
        enabled: true,
        focusDistance: 0.0035,
        focalLength: 0.01,
        bokehScale: 3,
    }
}

const DEFAULT_GLITCH_EFFECT: EffectWrapper = {
    type: EFFECT_TYPES.glitch,
    properties: {
        glitchMode: GlitchMode.CONSTANT_MILD,
        enabled: true,
        delay: [1.5, 3.5],
        duration: [0.6, 1.0],
        strength: [0.1, 0.1],
    }
}

export { DEFAULT_BLOOM_EFFECT, DEFAULT_DOF_EFFECT, DEFAULT_GLITCH_EFFECT };