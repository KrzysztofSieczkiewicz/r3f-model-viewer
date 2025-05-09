import React, { useRef } from "react";

import { PointLight } from "three";

import pointLightBillboard from '../../../icons/lightTypes/pointLight.svg';
import { LightProperties, LightWrapper, PointLightProperties } from "../../../models/Light"
import { LightsGizmo } from "./LightsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { IconBillboard } from "../helperObjects/IconBillboard";
import { SelectionSphere } from "../helperObjects/SelectionSphere";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";


type Props = {
    light: LightWrapper
}

export const RenderedPointLight = ( {light}: Props) => {
    const { updateLightProperties } = useSceneObjectsContext();

    const { color, position, distance, intensity } = light.properties as PointLightProperties;

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);
    
    const lightRef = useRef<PointLight>(null);

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
                <SelectionSphere onClick={handleSelect} />
            </pointLight>
            <IconBillboard icon={pointLightBillboard} position={position} />
        </group>
    );
}