import { Primitives, PrimitiveWrapper } from "../../../../models/Primitive";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";
import { ConeGeometry } from "three";

export const getPrimitiveGeometry = (primitive: PrimitiveWrapper) => {
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
    }
}