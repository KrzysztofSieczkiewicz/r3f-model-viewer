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