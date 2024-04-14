import pointLightBillboard from '../../icons/lightTypes/pointLight.svg';
import spotLightBillboard from '../../icons/lightTypes/spotLight.svg';

import React, { useRef, useState } from 'react';
import { Billboard, Sphere, useHelper, useTexture } from "@react-three/drei";
import { LIGHT_TYPES, LightOption } from '../../models/Light';
import { BoxHelper, Mesh } from 'three';

type Props = {
    lightType: LightOption
    onClick: () => void
}

export const LightTypeBillboard = ( {lightType, onClick}: Props) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    const selectionSphere = useRef<Mesh>(null)

    // HANDLE DISPLAYED IMAGE TYPE -> TODO: CONSIDER MOVING TO A SEPARATE HOOK
    let image = "";
    switch (lightType) {
        case LIGHT_TYPES.pointLight:
            image = pointLightBillboard
            break;
        case LIGHT_TYPES.spotLight:
            image = spotLightBillboard
            break;
    }
    const texture = useTexture(image);

    // TODO: REPLACE IMAGES WITH 2D MESH, WILL ALLOW TO IMPLEMENT OUTLINES FOR SELECTION AND NEAT DYNAMIC COLOR CHANGING

    //useHelper((isSelected||isHovered) && lightRef as any, PointLightHelper, 0.25, light.color);
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
