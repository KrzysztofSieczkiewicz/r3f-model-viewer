import React, { useRef } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { useHelper } from "@react-three/drei";
import { SpotLight, SpotLightHelper } from "three";

import { LightProperties, LightWrapper, SpotLightProperties } from "../../../models/Light"
import { LightTypeBillboard } from "./LightTypeBillboard";
import { LightsGizmo } from "./LightsGizmo";
import { useSceneValue } from "../../contexts/SceneContext";

type Props = {
    light: LightWrapper,}

export const RenderedSpotLight = ( {light}: Props) => {
    const { updateLightProperties: updateLight } = useSceneObjectsContext();
    const [ selectedObjectId, setScene ] = useSceneValue((scene)=> scene["selectedObjectId"]);

    const lightRef = useRef<SpotLight>(null);

    const { color, position, distance, intensity, angle, penumbra } = light.properties as SpotLightProperties;

    useHelper((selectedObjectId===light.id) && lightRef as any, SpotLightHelper, color);

    return (
        <group>
            {selectedObjectId===light.id && 
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
                <LightTypeBillboard 
                    type={light.type}
                    onClick={() => setScene({selectedObjectId: light.id}) } />
            </spotLight>
        </group>
    );
}