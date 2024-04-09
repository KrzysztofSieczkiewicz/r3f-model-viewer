import React from "react";
import { LIGHT_TYPES, LightWrapper } from "../models/Light"
import { Sphere } from "@react-three/drei";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedLight = ( {light, isSelected}: Props) => {

    // TODO: ADD WORKING LOGIC => USE INTENSITY, ETC TO DICTATE HOW BIG PLACEHOLDER/HELPER SHOULD BE
    const handleLightRadius = () => {
        const radiusBase = 0.5

        return 0.5;
    }

    // TODO: ADD HELPER FOR A LIGHT THAT HAS A DIRECTION (LEAVE UNCHANGED FOR POINT LIGHT)
    //useHelper(dirLight, DirectionalLightHelper, "red");


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
                <meshNormalMaterial wireframe />
            </Sphere>
            {light.type === LIGHT_TYPES.pointLight && 
            <pointLight 
                key={light.id} 
                color={light.color} 
                intensity={light.intensity} 
            />}
            {light.type === LIGHT_TYPES.spotLight && 
            <spotLight 
                key={light.id} 
                color={light.color} 
                intensity={light.intensity}
                angle={light.angle}
                penumbra={light.penumbra}
            />}
        </group>
    );
    // if (light.type === LIGHT_TYPES.pointLight && light.visible) {
    //     return <pointLight 
    //         key={light.id} 
    //         position={light.position}
    //         rotation={light.rotation}
    //         color={light.color} 
    //         intensity={light.intensity} 
    //         />;
    // } else if (light.type === LIGHT_TYPES.spotLight && light.visible) {
    // return <spotLight 
    //         key={light.id} 
    //         position={light.position}
    //         rotation={light.rotation}
    //         color={light.color} 
    //         intensity={light.intensity}
    //         angle={light.angle}
    //         penumbra={light.penumbra}
    //         />;
    // }
}