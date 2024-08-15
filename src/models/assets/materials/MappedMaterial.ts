import { Texture } from "three";
import { BaseMaterialProperties } from "./BaseMaterial";

// TODO: Maybe introduce simplified materials with only few maps and sliders
// AND advanced materials with more advanced maps
export type MappedMaterialsProperties = {
    alphaMap: Texture,
    ambientOcclusionMap: Texture,
    ambientOcclusionMapIntensity: number,

    bumpMap: Texture,
    bumpScale: number,

    color: string,
    colorMap: Texture, // in ThreeJs it's named just 'map'

    displacementMap: Texture,
    displacementScale: number,
    displacementBias: number,

    emissive: string,
    emissiveMap: Texture,
    emissiveIntensity: number,

    environmentMap: Texture,
    environmentMapRotation: number,
    environmentMapIntensity: number,

    metalnessMap: Texture,
    metalness: number,

    normalMap: Texture,
    normalMapType: number, // TODO: INTRODUCE ENUM FOR THAT -> Options are THREE.TangentSpaceNormalMap (default), and THREE.ObjectSpaceNormalMap.
    normalScale: number,

    roughnessMap: Texture,
    roughness: number,
} & BaseMaterialProperties