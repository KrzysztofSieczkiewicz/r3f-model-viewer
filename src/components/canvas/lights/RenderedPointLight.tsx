import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { PointLight } from "three";

import { LightProperties, LightWrapper, PointLightProperties } from "../../../models/Light"
import { LightTypeBillboard } from './LightTypeBillboard';
import { LightsGizmo } from "./LightsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";


type Props = {
    light: LightWrapper
}

export const RenderedPointLight = ( {light}: Props) => {
    const { updateLightProperties } = useSceneObjectsContext();

    const { color, position, distance, intensity } = light.properties as PointLightProperties;

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);
    
    let lightRef = useRef<PointLight>(null);

    return (
        <group>
            {(isSelected) && 
                <LightsGizmo
                    position={position}
                    handleChange={(change: Partial<LightProperties>) => { updateLightProperties(light.id, change) }}
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
                    type={light.type} 
                    onClick={handleSelect} />
            </pointLight>
        </group>
    );
}