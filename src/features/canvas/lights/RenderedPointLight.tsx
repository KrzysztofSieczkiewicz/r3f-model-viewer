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

    const { color, position, distance, decay, intensity } = light.properties as PointLightProperties;

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);
    
    const lightRef = useRef<PointLight>(null);

    return (
        <group key={light.id} >
            {(isSelected) && 
                <LightsGizmo
                    position={position}
                    handleChange={(change: Partial<LightProperties>) => { updateLightProperties(light.id, change) }} />
            }

            <group position={position}>
                <pointLight
                    position={[0,0,0]}
                    ref={lightRef}
                    color={color} 
                    intensity={intensity}
                    distance={distance}
                    decay={decay} />
                <SelectionSphere onClick={handleSelect} />
                <IconBillboard icon={pointLightBillboard} />
            </group>
            
        </group>
    );
}