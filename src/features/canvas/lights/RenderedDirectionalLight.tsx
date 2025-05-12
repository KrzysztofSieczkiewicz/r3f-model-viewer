import React, { useEffect, useRef } from "react";

import { DirectionalLight, DirectionalLightHelper, Object3D } from "three";

import pointLightBillboard from '../../../icons/lightTypes/pointLight.svg';
import { DirectionalLightProperties, LightWrapper } from "../../../models/Light"
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
    
    const lightRef = useRef<DirectionalLight>(null);
    const targetRef = useRef<Object3D>(new Object3D());

    const { color, position, intensity, target } = light.properties as DirectionalLightProperties;

    const isSelected = useIsSelected(light.id);
    const handleSelect = useToggleSelect(light.id);

    useHelper(isSelected && lightRef as any, DirectionalLightHelper, 1, color);

    useEffect(() => {
        targetRef.current.position.set(...target)
    }, [position, target])

    return (
        <group key={light.id}>
            {(isSelected) && <>
                <LightsGizmo
                    position={position}
                    handleChange={(position) => { updateLightProperties(light.id, {position: position}) }} />
                <LightsGizmo
                    position={target}
                    handleChange={(target) => { updateLightProperties(light.id, {target: target}) }} />
            </>}

            <group position={position}>
                <directionalLight
                    position={[0,0,0]}
                    ref={lightRef}
                    color={color} 
                    intensity={intensity}
                    target={targetRef.current} />
                <SelectionSphere onClick={handleSelect} />
                <IconBillboard icon={pointLightBillboard} />
            </group>

        </group>
    );
}