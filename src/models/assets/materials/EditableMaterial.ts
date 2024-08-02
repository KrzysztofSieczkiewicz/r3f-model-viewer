export enum EditableMaterials {
    Sphere,
    Cone,
    Box,
}

export type BasicMaterialProperties = {
    transparent: boolean,
    opacity: number,

    depthTest: boolean

    flatShading: boolean,
    displayWireframe: boolean,
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

} & BasicMaterialProperties;

export type StandardMaterialProperties = {
    color: string,
    emissive: string,
    roughness: number,
    metalness: number

} & BasicMaterialProperties;

export type PhongMaterialProperties = {
    color: string,
    emissive: string,
    specular: string,
    shininess: number,

} & BasicMaterialProperties