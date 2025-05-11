import React from 'react';

import { Billboard, useTexture } from "@react-three/drei";

type Props = {
    icon: string,
    position?: [number, number, number],
}

export const IconBillboard = ( {position, icon}: Props) => {

    // TODO: REPLACE IMAGES WITH 2D MESH, WILL ALLOW TO IMPLEMENT OUTLINES FOR SELECTION AND NEAT DYNAMIC COLOR CHANGING
    // TODO: ADD PROPER ICON
    const texture = useTexture(icon);

    return (
    <>
        <Billboard
            follow={true}
            position={position} >
            <mesh>
                <planeGeometry 
                    attach="geometry" 
                    args={[0.75, 0.75]} />
                <meshBasicMaterial
                    attach="material" 
                    map={texture} 
                    transparent={true} />
            </mesh>
        </Billboard>
    </>
    );
}
