// TODO: SEPARATE MATERIAL INTO TWO CONTROLS:
// 1. BASE PROPERTIES: TRANSPARENCY/OPACITY, MESH SIDE,
// 2. SEPARATE PROPERTIES BY TYPE

export type PhysicalMaterialWrapper = {
    transparent: boolean,
    opacity: number,

    depthTest: boolean,

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

    flatShading: boolean,
    displayWireframe: boolean,

    
}