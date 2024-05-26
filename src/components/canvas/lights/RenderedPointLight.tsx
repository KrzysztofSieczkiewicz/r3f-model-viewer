import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";

import { PointLight } from "three";

import { LightProperties, LightWrapper, PointLightProperties } from "../../../models/Light"
import { LightTypeBillboard } from './LightTypeBillboard';
import { LightsGizmo } from "./LightsGizmo";


type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedPointLight = ( {light, isSelected}: Props) => {
    const { updateLightProperties: updateLight } = useSceneObjectsContext();
    const { updateSelected } = useSidebarControlsContext();
    
    let lightRef = useRef<PointLight>(null);

    const { color, position, distance, intensity } = light.properties as PointLightProperties;

    return (
        <group>
            {isSelected && 
                <LightsGizmo
                    light={light}
                    handleChange={(change: Partial<LightProperties>) => { updateLight(light.id, change) }}
                />
            }
            <pointLight
                key={light.id} 
                position={position}
                ref={lightRef}
                color={color} 
                intensity={intensity}
                distance={distance}
            >
                <LightTypeBillboard 
                    lightType={light.type} 
                    onClick={() => updateSelected(light.id) } />
            </pointLight>
        </group>
    );
}