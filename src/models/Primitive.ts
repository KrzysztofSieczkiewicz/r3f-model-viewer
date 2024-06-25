export enum Primitives {
    Sphere,
    Cone,
}

export type SphereProperties = {
    radius: number,
    horizontalTris: number,
    vertivalTris: number,
}

export type ConeProperties = {
    radius: number,
    horizontalTris: number,
    vertivalTris: number,
}



export type PrimitiveProperties = SphereProperties | ConeProperties;

export type PrimitiveWrapper =
    {type: Primitives.Sphere, properties: SphereProperties} |
    {type: Primitives.Cone, properties: ConeProperties}