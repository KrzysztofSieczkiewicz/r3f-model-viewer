import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { useHelper } from "@react-three/drei";
import { SpotLight, SpotLightHelper } from "three";

import spotLightBillboard from '../../../icons/lightTypes/spotLight.svg';
import { LightProperties, LightWrapper, SpotLightProperties } from "../../../models/Light"
import { LightsGizmo } from "./LightsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { IconBillboard } from "../helperObjects/IconBillboard";
import { SelectionSphere } from "../helperObjects/SelectionSphere";

type Props = {
    light: LightWrapper,}

export const RenderedSpotLight = ( {light}: Props) => {
    const { updateLightProperties: updateLight } = useSceneObjectsContext();

    const lightRef = useRef<SpotLight>(null);

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);

    const { color, position, distance, intensity, angle, penumbra } = light.properties as SpotLightProperties;

    useHelper(isSelected && lightRef as any, SpotLightHelper, color);

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
                <SelectionSphere onClick={handleSelect} />
            </spotLight>
            <IconBillboard icon={spotLightBillboard} position={position} />
        </group>
    );
}