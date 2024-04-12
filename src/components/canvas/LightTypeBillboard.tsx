import pointLightBillboard from '../../icons/lightTypes/pointLight.svg';
import spotLightBillboard from '../../icons/lightTypes/spotLight.svg';

import React from 'react';
import { Billboard, Sphere, useTexture } from "@react-three/drei";
import { LIGHT_TYPES, LightOption } from '../../models/Light';

type Props = {
    lightType: LightOption

    onPointerOver: () => void
    onPointerOut: () => void
    onClick: () => void
}

export const LightTypeBillboard = ( {lightType, onPointerOver, onPointerOut, onClick}: Props) => {

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

    //


    return (
    <>
        <Billboard
            follow={true}
            position={[0, 0, 0]} >
            <mesh>
                <planeBufferGeometry 
                    attach="geometry" 
                    args={[0.75, 0.75]} />
                <meshBasicMaterial
                    attach="material" 
                    map={texture} 
                    transparent={true} />
            </mesh>
        </Billboard>
        <Sphere
            visible={false}
            position={[0,0,0]}
            args={[0.5, 4,2]}
            onPointerOver={ () => onPointerOver() }
            onPointerOut={ () => onPointerOut() }
            onClick={() => onClick() } 
        />
    </>
    );
}