import React, { useRef, useState } from "react";
import { LightWrapper } from "../models/Light"
import { Billboard, Sphere, useHelper } from "@react-three/drei";
import { PointLightHelper, SpotLight, SpotLightHelper } from "three";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { LightTypeBillboard } from "../components/canvas/LightTypeBillboard";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {
    const { updateSelected } = useSidebarControlsContext();

    const [isHovered, setIsHovered] = useState(false);

    const lightRef = useRef<SpotLight>(null);

    // TODO: HANDLE THIS HELPER WITH PROPER SELECT/HOVER LOGIC
    //useHelper((isSelected||isHovered) && lightRef as any, PointLightHelper, 0.25, light.color);
    useHelper((isSelected||isHovered) && lightRef as any, SpotLightHelper, light.color);

    // TODO: ADD TRANSFORM CONTROLS WHEN SELECTED
    return (
        <group position={light.position} >
            <LightTypeBillboard 
                lightType={light.type} 
                onPointerOver={ () => setIsHovered(true) }
                onPointerOut={ () => setIsHovered(false) }
                onClick={() => updateSelected(light.id) } />
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