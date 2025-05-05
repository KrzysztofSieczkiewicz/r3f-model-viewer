import React, { useRef } from "react";

import { DirectionalLight, DirectionalLightHelper } from "three";

import pointLightBillboard from '../../../icons/lightTypes/pointLight.svg';
import { DirectionalLightProperties, LightProperties, LightWrapper } from "../../../models/Light"
import { LightsGizmo } from "./LightsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { IconBillboard } from "../helperObjects/IconBillboard";
import { SelectionSphere } from "../helperObjects/SelectionSphere";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { useHelper } from "@react-three/drei";

// TODO: find suitable icon and replace pointLightBillboard

type Props = {
    light: LightWrapper
}

export const RenderedDirectionalLight = ( {light}: Props) => {
    const { updateLightProperties } = useSceneObjectsContext();

    const { color, position, intensity } = light.properties as DirectionalLightProperties;

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);
    
    let lightRef = useRef<DirectionalLight>(null);

    useHelper(isSelected && lightRef as any, DirectionalLightHelper, 1, color);

    return (
        <group>
            {(isSelected) && 
                <LightsGizmo
                    position={position}
                    handleChange={(change: Partial<LightProperties>) => { updateLightProperties(light.id, change) }}
                />
            }
            <directionalLight
                key={light.id} 
                position={position}
                ref={lightRef}
                color={color} 
                intensity={intensity}
            >
                <SelectionSphere onClick={handleSelect} />
            </directionalLight>
            <IconBillboard icon={pointLightBillboard} position={position} />
        </group>
    );
}