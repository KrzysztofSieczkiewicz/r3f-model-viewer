import React, { useRef } from "react";
import { LightWrapper } from "../models/Light"
import { useHelper } from "@react-three/drei";
import { PointLight, PointLightHelper } from "three";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedPointLight = ( {light, isSelected}: Props) => {

    let lightRef = useRef<PointLight>(null);

    // TODO: ADD WORKING LOGIC => USE INTENSITY, ETC TO DICTATE HOW BIG PLACEHOLDER/HELPER SHOULD BE
    const handleLightRadius = () => {
        const radiusBase = 0.5;
        const intensityFactor = (light.intensity+1) * 0.5;

        return radiusBase * intensityFactor;
    }

    useHelper(lightRef as any, PointLightHelper, handleLightRadius(), light.color);

    return (
        <pointLight
            key={light.id} 
            position={light.position}
            rotation={[0,0,0]}
            ref={lightRef}
            color={light.color} 
            intensity={light.intensity}
        />
    );
}