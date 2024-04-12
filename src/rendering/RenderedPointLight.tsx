import pointLightBillboard from '../icons/lightTypes/pointLight.png';

import React, { useRef, useState } from "react";
import { LightWrapper } from "../models/Light"
import { PivotControls, Sphere, useHelper } from "@react-three/drei";
import { PointLight, PointLightHelper } from "three";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";
import { LightTypeBillboard } from '../components/canvas/LightTypeBillboard';

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedPointLight = ( {light, isSelected}: Props) => {
    const { updateSelected } = useSidebarControlsContext();

    const [isHovered, setIsHovered] = useState(false);
    
    let lightRef = useRef<PointLight>(null);

    // TODO: ADD WORKING LOGIC => USE INTENSITY, ETC TO DICTATE HOW BIG PLACEHOLDER/HELPER SHOULD BE
    const handleLightRadius = () => {
        const radiusBase = 0.75;
        const intensityFactor = (light.intensity + 1) * 0.5;

        return radiusBase * intensityFactor;
    }

    //useHelper((isSelected||isHovered) && lightRef as any, PointLightHelper, handleLightRadius(), light.color);

    // TODO: ADD BOX HELPER WHEN HOVERED?
    // TODO: MOVE CONTROLS TO SEPARATE COMPONENT
    return (
        <group
            position={light.position}
        >
            {isSelected && 
                <PivotControls // TODO; HANDLE DRAGGING LOGIC
                    offset={[0,0,0]}
                    //onDrag={ () => { handleControlsDrag() }}
                    //onDragEnd={ () => {  }}
                    //ref={controlsRef}
                    visible={true}
                    depthTest={false}
                />
            }
            <LightTypeBillboard 
                lightType={light.type} 
                onPointerOver={ () => setIsHovered(true) }
                onPointerOut={ () => setIsHovered(false) }
                onClick={() => updateSelected(light.id) } />
            <pointLight
                key={light.id} 
                position={[0,0,0]}
                rotation={[0,0,0]}
                ref={lightRef}
                color={light.color} 
                intensity={light.intensity}
                distance={light.distance}
            />
        </group>
    );
}