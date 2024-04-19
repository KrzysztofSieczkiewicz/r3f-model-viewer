import React, { useRef } from "react";
import { LightWrapper } from "../../models/Light"
import { useHelper } from "@react-three/drei";
import { SpotLight, SpotLightHelper } from "three";
import { useSidebarControlsContext } from "../../components/sidebar/SidebarControlsContext";
import { LightTypeBillboard } from "../../components/canvas/LightTypeBillboard";
import { PositionControls } from "../../components/canvas/PositionControls";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {
    const { updateLight, updateSelected } = useSidebarControlsContext();

    const lightRef = useRef<SpotLight>(null);

    useHelper((isSelected) && lightRef as any, SpotLightHelper, light.color);

    return (
        <group>
            {isSelected && 
                <PositionControls
                object={light}
                handleChange={(newLight) => { updateLight(newLight as LightWrapper) }}
                />
            }
            <spotLight // TODO: ADD TARGET HANDLING
                key={light.id} 
                position={light.position}
                distance={light.distance}
                ref={lightRef}
                color={light.color}
                intensity={light.intensity}
                angle={light.angle}
                penumbra={light.penumbra}
            >
                <LightTypeBillboard 
                    lightType={light.type}
                    onClick={() => updateSelected(light.id) } />
            </spotLight>
        </group>
    );
}