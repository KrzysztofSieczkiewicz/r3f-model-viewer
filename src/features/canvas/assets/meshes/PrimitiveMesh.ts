import { Primitives, PrimitiveWrapper } from "../../../../models/assets/meshes/Primitive";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";
import { BoxGeometry, ConeGeometry } from "three";

export const PrimitiveGeometry = (primitive: PrimitiveWrapper) => {
    switch(primitive.type) {
        case Primitives.Sphere:
            return new SphereGeometry(
                primitive.properties.radius, 
                primitive.properties.widthSegments, 
                primitive.properties.heightSegments);
        case Primitives.Cone:
            return new ConeGeometry(
                primitive.properties.radius,
                primitive.properties.height,
                primitive.properties.radialSegments,
                primitive.properties.heightSegments);
        case Primitives.Box:
            return new BoxGeometry(
                primitive.properties.height,
                primitive.properties.width,
                primitive.properties.depth);
    }
}