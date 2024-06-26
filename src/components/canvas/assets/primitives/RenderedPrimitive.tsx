import React from "react";

export const RenderedPrimitive = () => {


    return (
        <mesh matrixWorldAutoUpdate={true}>
            <sphereBufferGeometry 
                attach="geometry" 
                args={[1, 8, 4]} />
        </mesh>
    );
};