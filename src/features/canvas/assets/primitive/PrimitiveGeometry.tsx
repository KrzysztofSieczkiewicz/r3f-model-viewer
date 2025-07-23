import React from "react";
import { memo } from "react";
import { Primitives, PrimitiveWrapper } from "../../../../models/assets/meshes/Primitive";


export const PrimitiveGeometry = memo(({mesh}: {mesh: PrimitiveWrapper}) => {
    switch (mesh.type) {
        case Primitives.Sphere:
            return ( <sphereGeometry args={[
                mesh.properties.radius,
                mesh.properties.widthSegments,
                mesh.properties.heightSegments
            ]} /> );
        case Primitives.Cone:
            return ( <coneGeometry args={[
                mesh.properties.radius,
                mesh.properties.height,
                mesh.properties.radialSegments,
                mesh.properties.heightSegments
            ]} /> );
        case Primitives.Box:
            return ( <boxGeometry args={[
                mesh.properties.height,
                mesh.properties.width,
                mesh.properties.depth
            ]} /> );
    }
}, (prevProps, nextProps) => prevProps.mesh === nextProps.mesh);