import React, { useRef, useState } from 'react';

import cameraBillboard from '../../../icons/perspectiveCamera.svg';

import { Billboard, Sphere, useHelper, useTexture } from "@react-three/drei";
import { BoxHelper, Mesh } from 'three';

type Props = {
    onClick: () => void
}

export const CameraBillboard = ( {onClick}: Props) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    const selectionSphere = useRef<Mesh>(null)

    // TODO: REPLACE IMAGES WITH 2D MESH, WILL ALLOW TO IMPLEMENT OUTLINES FOR SELECTION AND NEAT DYNAMIC COLOR CHANGING
    // TODO: ADD PROPER ICON
    const image = cameraBillboard
    const texture = useTexture(image);

    useHelper(isHovered && selectionSphere as any, BoxHelper, "white");

    return (
    <>
        <Billboard
            follow={true}
            position={[0, 0, 0]} >
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
        <Sphere
            ref={selectionSphere}
            visible={false}
            position={[0,0,0]}
            args={[0.35, 4,2]}
            onPointerOver={ () => {
                setIsHovered(true)
            }}
            onPointerOut={ () => {
                setIsHovered(false)
            }}
            onClick={() => onClick() }
        />
    </>
    );
}
