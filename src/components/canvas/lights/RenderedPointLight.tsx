import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { PointLight } from "three";

import { LightProperties, LightWrapper, PointLightProperties } from "../../../models/Light"
import { LightTypeBillboard } from './LightTypeBillboard';
import { LightsGizmo } from "./LightsGizmo";
import { useSceneValue } from "../../contexts/SceneContext";


type Props = {
    light: LightWrapper
}

export const RenderedPointLight = ( {light}: Props) => {
    const { updateLightProperties } = useSceneObjectsContext();
    const [ selectedObjectId, setScene ] = useSceneValue((scene)=> scene["selectedObjectId"]);

    const { color, position, distance, intensity } = light.properties as PointLightProperties;
    
    let lightRef = useRef<PointLight>(null);

    return (
        <group>
            {(selectedObjectId===light.id) && 
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
                    onClick={() => setScene({selectedObjectId: light.id}) } />
            </pointLight>
        </group>
    );
}