export type GeometryMetadata = {
    id: string,
    name: string,
    traversalIndex: number,
}

export type UnwrappedWrapper = {
    src: string,
    geometries: GeometryMetadata[],
}