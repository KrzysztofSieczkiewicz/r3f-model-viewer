import React from "react";
import { SphereProperties } from "../../../../models/Primitive";

type Props = {
    properties: SphereProperties
}

export const RenderedPrimitive = ( {properties}: Props) => {


    return (
        <mesh matrixWorldAutoUpdate={true}>
            <sphereBufferGeometry 
                attach="geometry" 
                args={[
                    properties.radius,
                    properties.widthSegments,
                    properties.heightSegments
                ]} />
        </mesh>
    );
};