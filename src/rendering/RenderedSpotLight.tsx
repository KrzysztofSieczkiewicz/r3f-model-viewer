import React, { useRef } from "react";
import { LightWrapper } from "../models/Light"
import { useHelper } from "@react-three/drei";
import { PointLightHelper, SpotLight, SpotLightHelper, Vector3 } from "three";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {

    let lightRef = useRef<SpotLight>(null);

    useHelper(lightRef as any, SpotLightHelper, light.color);
    lightRef.current?.lookAt(new Vector3(0,0,0))

    return (
        <spotLight
            key={light.id} 
            position={light.position}
            rotation={light.rotation}
            ref={lightRef}
            color={light.color} 
            intensity={light.intensity}
            angle={light.angle}
            penumbra={light.penumbra}
        />
    );
}