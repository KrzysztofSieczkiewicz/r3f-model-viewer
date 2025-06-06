export type GeometryMetadataGLTF = {
    id: string,
    name: string,
    traversalIndex: number,
}


export type UnwrappedWrapper = {
    src: string,
    geometries: GeometryMetadataGLTF[],
}