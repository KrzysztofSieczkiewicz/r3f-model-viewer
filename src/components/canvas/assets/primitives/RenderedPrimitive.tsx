import React from "react";
import { SphereProperties } from "../../../../models/Primitive";

type Props = {
    properties: SphereProperties
}

export const RenderedPrimitive = ( {properties}: Props) => {


    // TODO: HANDLE DIFFERENT PRIMITIVES
    const handlePrimitiveType = () => {
    }

    // TODO: REPLACE COMPONENT WITH THREE.sphereBufferedGeometry
    // THIS WAY YOU CAN JUST CREATE PROPER GEOMETRY VARIABLE AND ASSIGN IT TO <mesh> INSIDE RenderedAsset


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