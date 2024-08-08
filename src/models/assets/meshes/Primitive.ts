// TODO: INTRODUCE MORE PRIMITIVES
//https://threejs-journey.com/lessons/geometries#the-different-built-in-geometries

export enum Primitives {
    Sphere,
    Cone,
    Box,
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

export type BoxProperties = {
    height: number,
    width: number,
    depth: number,
}

export type PrimitiveProperties = 
    SphereProperties | 
    ConeProperties |
    BoxProperties;

export type PrimitiveWrapper =
    {type: Primitives.Sphere, properties: SphereProperties} |
    {type: Primitives.Cone, properties: ConeProperties} |
    {type: Primitives.Box, properties: BoxProperties}

export const DEFAULT_MESH_SPHERE: PrimitiveWrapper = {
    type: Primitives.Sphere,
    properties: {
        radius: 1,
        widthSegments: 48,
        heightSegments: 24,
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

export const DEFAULT_MESH_BOX: PrimitiveWrapper = {
    type: Primitives.Box,
    properties: {
        height: 1,
        width: 1,
        depth: 1,
    }
}