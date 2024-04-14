import React, { useRef } from "react";
import { LightWrapper } from "../models/Light"
import { PointLight } from "three";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { LightTypeBillboard } from '../components/canvas/LightTypeBillboard';
import { PositionControls } from '../components/canvas/PositionControls';

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedPointLight = ( {light, isSelected}: Props) => {
    const { updateLight, updateSelected } = useSidebarControlsContext();
    
    let lightRef = useRef<PointLight>(null);

    return (
        <group>
            {isSelected && 
                <PositionControls
                object={light}
                handleChange={(newLight) => { updateLight(newLight as LightWrapper) }}
                />
            }
            <pointLight
                key={light.id} 
                position={light.position}
                rotation={[0,0,0]}
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