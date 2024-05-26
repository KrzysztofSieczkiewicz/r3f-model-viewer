import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";

import { useHelper } from "@react-three/drei";
import { SpotLight, SpotLightHelper } from "three";

import { LightProperties, LightWrapper, SpotLightProperties } from "../../../models/Light"
import { LightTypeBillboard } from "./LightTypeBillboard";
import { LightsGizmo } from "./LightsGizmo";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {
    const { updateLightProperties: updateLight } = useSceneObjectsContext();
    const { updateSelected } = useSidebarControlsContext();

    const lightRef = useRef<SpotLight>(null);

    const { color, position, distance, intensity, angle, penumbra } = light.properties as SpotLightProperties;

    useHelper((isSelected) && lightRef as any, SpotLightHelper, color);

    return (
        <group>
            {isSelected && 
                <LightsGizmo
                    position={position}
                    handleChange={(change: Partial<LightProperties>) => { updateLight(light.id, change) }}
                />
            }
            <spotLight // TODO: ADD TARGET HANDLING
                key={light.id} 
                position={position}
                distance={distance}
                ref={lightRef}
                color={color}
                intensity={intensity}
                angle={angle}
                penumbra={penumbra}
            >
                <LightTypeBillboard 
                    type={light.type}
                    onClick={() => updateSelected(light.id) } />
            </spotLight>
        </group>
    );
}