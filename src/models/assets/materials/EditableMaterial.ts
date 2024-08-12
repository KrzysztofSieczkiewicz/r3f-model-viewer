import { BaseMaterialProperties } from "./BaseMaterial";

export enum EditableMaterials {
    Physical = "Physical",
    Standard = "Standard",
    Basic = "Basic",
}

export type PhysicalMaterialProperties = {
    color: string,
    emissive: string,
    roughness: number,
    metalness: number,
    ior: number,
    reflectivity: number,
    iridescence: number,
    iridescenceIor: number,
    sheen: number,
    sheenRoughness: number,
    sheenColor: string,
    clearcoat: number,
    clearcoatRoughness: number,
    specularIntensity: number,
    specularColor: string
} & BaseMaterialProperties;

export type StandardMaterialProperties = {
    color: string,
    emissive: string,
    roughness: number,
    metalness: number
} & BaseMaterialProperties;

export type PhongMaterialProperties = {
    color: string,
    emissive: string,
    specular: string,
    shininess: number,
} & BaseMaterialProperties

export type EditableMaterialProperties =
    PhysicalMaterialProperties |
    StandardMaterialProperties |
    PhongMaterialProperties;


export type EditableMaterialWrapper =
    {type: EditableMaterials.Physical, properties: PhysicalMaterialProperties} |
    {type: EditableMaterials.Standard, properties: StandardMaterialProperties} |
    {type: EditableMaterials.Basic, properties: PhongMaterialProperties}

const DEFAULT_MATERIAL_PHYSICAL: EditableMaterialWrapper = {
    type: EditableMaterials.Physical,
    properties: {
        transparent: false,
        opacity: 0.5,
        flatShading: false,
        displayWireframe: false,

        color: '#ffffff',
        emissive: '#000000',
        roughness: 0.5,
        metalness: 0,
        ior: 1.35,
        reflectivity: 0.2,
        iridescence: 0,
        iridescenceIor: 1.35,
        sheen: 0,
        sheenRoughness: 0.25,
        sheenColor: '#aaaaaa',
        clearcoat: 0,
        clearcoatRoughness: 0.25,
        specularIntensity: 0,
        specularColor: '#aaaaaa'
    }
}

const DEFAULT_MATERIAL_STANDARD: EditableMaterialWrapper = {
    type: EditableMaterials.Standard,
    properties: {
        transparent: false,
        opacity: 0.5,
        flatShading: false,
        displayWireframe: false,

        color: '#ffffff',
        emissive: '#000000',
        roughness: 0.5,
        metalness: 0,
    }
}

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

export const  DEFAULT_EDITABLE_MATERIALS = {
    [EditableMaterials.Physical]: DEFAULT_MATERIAL_PHYSICAL,
    [EditableMaterials.Standard]: DEFAULT_MATERIAL_STANDARD,
    [EditableMaterials.Basic]: DEFAULT_MATERIAL_BASIC
}