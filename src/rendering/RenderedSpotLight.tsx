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

    // TODO: HANDLE THIS HELPER WITH PROPER SELECT/HOVER LOGIC (ALSO CHANGE COLORS TO CONSTANT WHEN BILLBOARDS WILL BE COLOURED)
    //useHelper(lightRef as any, PointLightHelper, 0.25, light.color);
    useHelper((isSelected||isHovered) && lightRef as any, SpotLightHelper, light.color);

    // TODO: ADD TRANSFORM CONTROLS WHEN SELECTED
    return (
        <group position={light.position} >
            <Sphere
                visible={false}
                position={[0,0,0]}
                args={[0.5, 4,2]}
                onPointerOver={ () => setIsHovered(true) }
                onPointerOut={ () => setIsHovered(false) }
                onClick={() => updateSelected(light.id) } 
            />
            <LightTypeBillboard lightType={light.type} />
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