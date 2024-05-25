import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";

import { PointLight } from "three";

import { LightWrapper } from "../../../models/Light"
import { LightTypeBillboard } from './LightTypeBillboard';
import { PositionControls } from '../PositionControls';


type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedPointLight = ( {light, isSelected}: Props) => {
    const { updateLight } = useSceneObjectsContext();
    const { updateSelected } = useSidebarControlsContext();
    
    let lightRef = useRef<PointLight>(null);

    return (
        <group>
            {isSelected && 
                <PositionControls
                object={light}
                handleChange={(change: Partial<LightWrapper>) => { updateLight(light.id, change) }}
                />
            }
            <pointLight
                key={light.id} 
                position={light.position}
                ref={lightRef}
                color={light.color} 
                intensity={light.intensity}
                distance={light.distance}
            >
                <LightTypeBillboard 
                    lightType={light.type} 
                    onClick={() => updateSelected(light.id) } />
            </pointLight>
        </group>
    );
}