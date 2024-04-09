import React, { Ref, RefObject, useRef, useState } from "react";
import { LIGHT_TYPES, LightWrapper } from "../models/Light"
import { Sphere, useHelper } from "@react-three/drei";
import { DirectionalLightHelper, Light, PointLight, SpotLight } from "three";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedLight = ( {light, isSelected}: Props) => {

    let lightRef = useRef<PointLight | SpotLight>(null);

    // TODO: ADD WORKING LOGIC => USE INTENSITY, ETC TO DICTATE HOW BIG PLACEHOLDER/HELPER SHOULD BE
    const handleLightRadius = () => {
        const radiusBase = 0.5;
        const intensityFactor = (light.intensity+1) * 0.5;

        return radiusBase * intensityFactor;
    }

    // TODO [TUTORING]: ADD HELPER FOR A LIGHT THAT HAS A DIRECTION (LEAVE UNCHANGED FOR POINT LIGHT)
    // HOW TO HANDLE THESE REF ISSUES (OR SOMEHOW INFINITE RERENDERING LOOPS)
    //useHelper(lightRef as any, DirectionalLightHelper, 1, "red");


    if(!light.visible) return;

    return (
        <group
            key={light.id} 
            position={light.position}
            rotation={light.rotation}
        >
            <Sphere
            //radius, widthSegments, heightSegments
                args={[handleLightRadius(), 8, 4]}
            >
                <meshBasicMaterial color={light.color} wireframe />
            </Sphere>

            {light.type === LIGHT_TYPES.pointLight && 
            <pointLight
                ref={lightRef as Ref<PointLight>}           // TODO [TUTORING]: IS THIS TYPE OF REF CASTING OK?
                color={light.color} 
                intensity={light.intensity} 
            />}
            {light.type === LIGHT_TYPES.spotLight && 
            <spotLight
                ref={lightRef as Ref<SpotLight>}
                color={light.color} 
                intensity={light.intensity}
                angle={light.angle}
                penumbra={light.penumbra}
            />}
        </group>
    );
}