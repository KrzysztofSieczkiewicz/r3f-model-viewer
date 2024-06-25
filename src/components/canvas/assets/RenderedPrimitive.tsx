
import { NEW_INIT_ASSET_LIST } from "../../../models/Asset";
import React from "react";

export const RenderedPrimitive = () => {


    // TODO: UNIFY ROTATION UNITS, EVERYTHING IS USING DIFFERENT SYSTEM
    return (
        <group>
            <mesh
                matrixWorldAutoUpdate={true}
            >
                <sphereBufferGeometry 
                    attach="geometry" 
                    args={[1, 8, 4]} />
            </mesh>
        </group>
    );
};