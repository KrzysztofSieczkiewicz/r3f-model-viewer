import React, { useRef, useState } from "react";
import { LightWrapper } from "../models/Light"
import { Sphere, useHelper } from "@react-three/drei";
import { PointLightHelper, SpotLight, SpotLightHelper } from "three";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {

    const [isHovered, setIsHovered] = useState(false);

    const lightRef = useRef<SpotLight>(null);

    // TODO: RELPACE HELPER WITH 3D WIREFRAME (PROBABLY NEED TO MODEL MYSELF)
    useHelper(lightRef as any, PointLightHelper, 0.25, light.color);
    useHelper((isSelected||isHovered) && lightRef as any, SpotLightHelper, light.color);

    return (
        <group position={light.position} >
            <Sphere
                visible={false}
                position={[0,0,0]}
                args={[0.5, 4,2]}
                onPointerOver={ () => setIsHovered(true) }
                onPointerOut={ () => setIsHovered(false) }
            />
            <spotLight // TODO: ADD TARGET HANDLING
                key={light.id} 
                position={[0,0,0]}
                distance={light.distance}
                ref={lightRef}
                color={light.color}
                intensity={light.intensity}
                angle={light.angle}
                penumbra={light.penumbra}
            />
        </group>
    );
}