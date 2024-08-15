import { Texture, Vector2 } from "three";
import { BaseMaterialProperties } from "./BaseMaterial";

// TODO: REPLACE ALL COLORS TYPES WITH ThreeJS 'Color' class (consider that - it provides some functions, but they might be optional)
// TODO: Maybe introduce simplified materials with only few maps and sliders
// AND advanced materials with more advanced maps
// TODO: Consider replacing Physical and Standard materiales with mapped counterparts -> if there is map provided, hide (maybe grey out?) other controls for that property
export type MappedStandardMaterialsProperties = {
    alphaMap: Texture,
    ambientOcclusionMap: Texture,
    ambientOcclusionMapIntensity: number,

    bumpMap: Texture,
    bumpScale: number,

    color: string,
    colorMap: Texture, // in ThreeJS it's named just 'map'

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

export type MappedPhysicalMaterialsProperties = {
    anisotropyMap: Texture | null,
    anisotropy: number,
    anisotropyRotation: number,

    attenuationColor: string,
    attenuationDistance: number,
    
    clearcoatMap: Texture | null,
    clearcoat: number,
    clearcoatRoughnessMap: Texture | null,
    clearcoatRoughness: number,
    clearcoatNormalMap: Texture | null,
    clearcoatNormalScale: Vector2,

    dispersion: number,
    ior: number,
    
    reflectivity: number,

    iridescenceMap: Texture | null,
    iridescence: number,
    iridescenceIor: number,

    sheen: number,
    sheenRoughnessMap: Texture | null,
    sheenRoughness: number,
    sheenColorMap: string,
    sheenColor: string,

    specularIntensityMap: Texture | null,
    specularIntensity: number,
    specularColorMap: Texture | null,
    specularColor: string,

    thicknessMap: number,
    thickness: number,

    transmissionMap: Texture | null,
    transmission: number,
} & MappedStandardMaterialsProperties