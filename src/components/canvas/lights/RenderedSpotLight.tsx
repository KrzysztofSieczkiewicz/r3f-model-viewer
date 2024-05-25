import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";

import { useHelper } from "@react-three/drei";
import { SpotLight, SpotLightHelper } from "three";

import { LightWrapper } from "../../../models/Light"
import { LightTypeBillboard } from "./LightTypeBillboard";
import { PositionControls } from "../PositionControls";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedSpotLight = ( {light, isSelected}: Props) => {
    const { updateLight } = useSceneObjectsContext();
    const { updateSelected } = useSidebarControlsContext();

    const lightRef = useRef<SpotLight>(null);

    useHelper((isSelected) && lightRef as any, SpotLightHelper, light.color);

    return (
        <group>
            {isSelected && 
                <PositionControls
                object={light}
                handleChange={(change: Partial<LightWrapper>) => { updateLight(light.id, change) }}
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