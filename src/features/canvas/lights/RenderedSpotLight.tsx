import React, { useEffect, useRef } from "react";

import { useHelper } from "@react-three/drei";
import { Object3D, SpotLight, SpotLightHelper } from "three";
import { SpotLight as DreiSpotLight } from '@react-three/drei'

import spotLightBillboard from '../../../icons/lightTypes/spotLight.svg';
import { LightWrapper, SpotLightProperties } from "../../../models/Light"
import { LightsGizmo } from "./LightsGizmo";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { IconBillboard } from "../helperObjects/IconBillboard";
import { SelectionSphere } from "../helperObjects/SelectionSphere";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

type Props = {
    light: LightWrapper
}

export const RenderedSpotLight = ( {light}: Props) => {
    const { updateLightProperties } = useSceneObjectsContext();

    const lightRef = useRef<SpotLight>(null);
    const targetRef = useRef<Object3D>(new Object3D());

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);

    const { color, position, distance, intensity, angle, penumbra, decay, attenuation, target } = light.properties as SpotLightProperties;

    useHelper(isSelected && lightRef as any, SpotLightHelper, color);

    useEffect(() => {
            targetRef.current.position.set(...target)
        }, [position, target])

    return (
        <group>
            {isSelected && <>
                <LightsGizmo
                    position={position}
                    handleChange={(position) => { updateLightProperties(light.id, {position: position}) }}
                />
                <LightsGizmo
                    position={target}
                    handleChange={(target) => { updateLightProperties(light.id, {target: target}) }}
                />
            </>}
            <group position={position}>
                <DreiSpotLight
                    position={[0,0,0]}
                    castShadow={true}
                    radiusTop={0}
                    key={light.id} 
                    distance={distance}
                    ref={lightRef}
                    color={color}
                    intensity={intensity}
                    angle={angle}
                    penumbra={penumbra}
                    decay={decay}
                    attenuation={attenuation    }
                    target={targetRef.current} />
                <SelectionSphere onClick={handleSelect} />
                <IconBillboard icon={spotLightBillboard}/>
            </group>            
        </group>
    );
}