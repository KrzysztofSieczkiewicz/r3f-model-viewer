export enum Primitives {
    Sphere,
    Cone,
}

export type SphereProperties = {
    radius: number,
    widthSegments: number
    heightSegments: number,
}

export type ConeProperties = {
    radius: number,
    height: number,
    radialSegments: number,
    heightSegments: number,
}



export type PrimitiveProperties = SphereProperties | ConeProperties;

export type PrimitiveWrapper =
    {type: Primitives.Sphere, properties: SphereProperties} |
    {type: Primitives.Cone, properties: ConeProperties}

export const DEFAULT_MESH_SPHERE: PrimitiveWrapper = {
    type: Primitives.Sphere,
    properties: {
        radius: 1,
        widthSegments: 24,
        heightSegments: 12,
    }
}

export const DEFAULT_MESH_CONE: PrimitiveWrapper = {
    type: Primitives.Cone,
    properties: {
        radius: 0.5,
        height: 1,
        radialSegments: 12,
        heightSegments: 3,
    }
    
}