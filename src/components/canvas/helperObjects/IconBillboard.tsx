import React from 'react';

import cameraBillboard from '../../../icons/perspectiveCamera.svg';

import { Billboard, useTexture } from "@react-three/drei";

type Props = {
    position: [number, number, number],
}

export const IconBillboard = ( {position}: Props) => {

    // TODO: REPLACE IMAGES WITH 2D MESH, WILL ALLOW TO IMPLEMENT OUTLINES FOR SELECTION AND NEAT DYNAMIC COLOR CHANGING
    // TODO: ADD PROPER ICON
    const image = cameraBillboard
    const texture = useTexture(image);

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
