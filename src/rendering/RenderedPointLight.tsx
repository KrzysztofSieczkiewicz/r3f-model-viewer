import React, { useRef, useState } from "react";
import { LightWrapper } from "../models/Light"
import { Sphere, useHelper } from "@react-three/drei";
import { PointLight, PointLightHelper } from "three";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedPointLight = ( {light, isSelected}: Props) => {
    const { updateSelected } = useSidebarControlsContext();

    const [isHovered, setIsHovered] = useState(false);
    
    let lightRef = useRef<PointLight>(null);

    // TODO: ADD WORKING LOGIC => USE INTENSITY, ETC TO DICTATE HOW BIG PLACEHOLDER/HELPER SHOULD BE
    const handleLightRadius = () => {
        const radiusBase = 0.5;
        const intensityFactor = (light.intensity+1) * 0.5;

        return radiusBase * intensityFactor;
    }

    useHelper(lightRef as any, PointLightHelper, handleLightRadius(), light.color);


    return (
        <group
            position={light.position}
        >
            <Sphere
                visible={false}
                position={[0,0,0]}
                args={[0.5, 4,2]}
                onPointerOver={ () => setIsHovered(true) }
                onPointerOut={ () => setIsHovered(false) }
                onClick={() => updateSelected(light.id) } 
            />
            <pointLight
                key={light.id} 
                position={[0,0,0]}
                rotation={[0,0,0]}
                ref={lightRef}
                color={light.color} 
                intensity={light.intensity}
                distance={light.distance}
            />
        </group>
    );
}