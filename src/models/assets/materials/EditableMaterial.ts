import { Texture } from "three";

// TODO: IF THIS FILE GETS ANY LARGER -> SEPARATE MATERIALS INTO DIFFERENT FILES
//TODO: ADD TOON MATERIAL https://threejs.org/docs/#api/en/materials/MeshToonMaterial
export enum EditableMaterials {
    Physical = "Physical",
    Standard = "Standard",
    Basic = "Basic"
}

type BaseMaterialProperties = {
    transparent: boolean,
    opacity: number,
    flatShading: boolean,
    displayWireframe: boolean,
}

export type PhongMaterialProperties = {
    color: string,
    emissive: string,
    specular: string,
    shininess: number,
} & BaseMaterialProperties


export type StandardMaterialProperties = {
    colorMap: Texture|null,
    color: string,

    roughnessMap: Texture|null,
    roughness: number,
    metalnessMap: Texture|null,
    metalness: number,

    environmentMap: Texture|null,
    environmentMapRotation: number,
    environmentMapIntensity: number,

    emissive: string,
    emissiveMap: Texture|null,
    emissiveIntensity: number,

    alphaMap: Texture|null,
    ambientOcclusionMap: Texture|null,
    ambientOcclusionMapIntensity: number,

    normalMap: Texture|null,
    normalScale: number,

    bumpMap: Texture|null,
    bumpScale: number,
    displacementMap: Texture|null,
    displacementScale: number,
    displacementBias: number
} & BaseMaterialProperties;


export type PhysicalMaterialProperties = {
    reflectivity: number,
    dispersion: number,
    ior: number,

    specularIntensityMap: Texture|null,
    specularIntensity: number,
    specularColorMap: Texture|null,
    specularColor: string,

    attenuationColor: string,
    attenuationDistance: number,
    
    clearcoatMap: Texture|null,
    clearcoat: number,
    clearcoatRoughnessMap: Texture|null,
    clearcoatRoughness: number,
    clearcoatNormalMap: Texture|null,
    clearcoatNormalScale: [number, number],

    anisotropyMap: Texture|null,
    anisotropy: number,
    anisotropyRotation: number,

    iridescenceMap: Texture|null,
    iridescence: number,
    iridescenceIor: number,

    sheen: number,
    sheenRoughnessMap: Texture|null,
    sheenRoughness: number,
    sheenColorMap: Texture|null,
    sheenColor: string,

    thicknessMap: Texture|null,
    thickness: number,

    transmissionMap: Texture|null,
    transmission: number,
} & StandardMaterialProperties;

export type EditableMaterialProperties =
    PhysicalMaterialProperties |
    StandardMaterialProperties |
    PhongMaterialProperties;


export type EditableMaterialWrapper =
    {type: EditableMaterials.Physical, properties: PhysicalMaterialProperties} |
    {type: EditableMaterials.Standard, properties: StandardMaterialProperties} |
    {type: EditableMaterials.Basic, properties: PhongMaterialProperties}

    
const DEFAULT_MATERIAL_BASIC: EditableMaterialWrapper = {
    type: EditableMaterials.Basic,
    properties: {
        transparent: false,
        opacity: 0.5,
        flatShading: false,
        displayWireframe: false,

        color: '#ffffff',
        emissive: '#000000',
        specular: '#000000',
        shininess: 0.3,
    }
}

const DEFAULT_MATERIAL_STANDARD: EditableMaterialWrapper = {
    type: EditableMaterials.Standard,
    properties: {
        transparent: false,
        opacity: 0.5,
        flatShading: false,
        displayWireframe: false,

        colorMap: null,
        color: '#ffffff',

        roughnessMap: null,
        roughness: 0.5,
        metalnessMap: null,
        metalness: 0,

        environmentMap: null,
        environmentMapRotation: 0,
        environmentMapIntensity: 1,

        emissive: '#000000',
        emissiveMap: null,
        emissiveIntensity: 0.25,
        
        alphaMap: null,
        ambientOcclusionMap: null,
        ambientOcclusionMapIntensity: 0.75,

        normalMap: null,
        normalScale: 1,
        bumpMap: null,
        bumpScale: 0.75,
        displacementMap: null,
        displacementScale: 1,
        displacementBias: 0,
    }
}

const DEFAULT_MATERIAL_PHYSICAL: EditableMaterialWrapper = {
    type: EditableMaterials.Physical,
    properties: {
        flatShading: false,
        displayWireframe: false,

        colorMap: null,
        color: '#ffffff',

        roughnessMap: null,
        roughness: 0.5,
        metalnessMap: null,
        metalness: 0,

        environmentMap: null,
        environmentMapRotation: 0,
        environmentMapIntensity: 1,

        emissive: '#000000',
        emissiveMap: null,
        emissiveIntensity: 0.25,

        transparent: false,
        opacity: 1,
        transmissionMap: null,
        transmission: 0,
        
        alphaMap: null,
        ambientOcclusionMap: null,
        ambientOcclusionMapIntensity: 0.75,

        normalMap: null,
        normalScale: 1,
        bumpMap: null,
        bumpScale: 0.75,
        displacementMap: null,
        displacementScale: 1,
        displacementBias: 0,
        
        reflectivity: 0.2,
        dispersion: 0.5,
        ior: 1.35,

        specularIntensityMap: null,
        specularIntensity: 0,
        specularColorMap: null,
        specularColor: '#aaaaaa',

        attenuationColor: '#ffffff',
        attenuationDistance: 500,
        
        clearcoatMap: null,
        clearcoat: 0,
        clearcoatRoughnessMap: null,
        clearcoatRoughness: 0.25,
        clearcoatNormalMap: null,
        clearcoatNormalScale: [1,1],

        anisotropyMap: null,
        anisotropy: 0,
        anisotropyRotation: 0,

        iridescenceMap: null,
        iridescence: 0,
        iridescenceIor: 1.35,

        sheen: 0,
        sheenRoughnessMap: null,
        sheenRoughness: 0.25,
        sheenColorMap: null,
        sheenColor: '#aaaaaa',

        thicknessMap: null,
        thickness: 0,        
    }
}

export const  DEFAULT_EDITABLE_MATERIALS = {
    [EditableMaterials.Physical]: DEFAULT_MATERIAL_PHYSICAL,
    [EditableMaterials.Standard]: DEFAULT_MATERIAL_STANDARD,
    [EditableMaterials.Basic]: DEFAULT_MATERIAL_BASIC,
}