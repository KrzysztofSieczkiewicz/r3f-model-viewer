import pointLightBillboard from '../../icons/lightTypes/pointLight.svg';
import spotLightBillboard from '../../icons/lightTypes/spotLight.svg';

import React from 'react';
import { Billboard, useTexture } from "@react-three/drei";
import { LIGHT_TYPES, LightOption } from '../../models/Light';

type Props = {
    lightType: LightOption
}

// TODO: ADD CUSTOM COLOR HANDLING (OR DISPLAY THE COLOUR OTHERWISE)
export const LightTypeBillboard = ( {lightType}: Props) => {

    let image;
    switch (lightType) {
        case LIGHT_TYPES.pointLight:
            image = pointLightBillboard;
            break;
        case LIGHT_TYPES.spotLight:
            image = spotLightBillboard;
            break;
        default:
            image = pointLightBillboard;
            break;
    }
    const texture = useTexture(image);

    return (
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
    );
}