import React, { Ref, RefObject, useRef, useState } from "react";
import { LIGHT_TYPES, LightWrapper } from "../models/Light"
import { Sphere, useHelper } from "@react-three/drei";
import { DirectionalLightHelper, Group, Light, PointLight, PointLightHelper, SpotLight, SpotLightHelper, Vector3 } from "three";
import { RenderedPointLight } from "./RenderedPointLight";
import { RenderedSpotLight } from "./RenderedSpotLight";

type Props = {
    light: LightWrapper,
    isSelected: boolean
}

export const RenderedLight = ( {light, isSelected}: Props) => {

    let lightRef = useRef<PointLight | SpotLight>(null);

    const [ isDisplayed, setIsDisplayed ] = useState(false);

    // TODO: ADD WORKING LOGIC => USE INTENSITY, ETC TO DICTATE HOW BIG PLACEHOLDER/HELPER SHOULD BE
    const handleLightRadius = () => {
        const radiusBase = 0.5;
        const intensityFactor = (light.intensity+1) * 0.5;

        return radiusBase * intensityFactor;
    }

    // TODO: ADD BETTER HANDLING FOR DIFFERENT LIGHT HELPERS
    useHelper(lightRef as any, PointLightHelper, 1, light.color);


    if(!light.visible) return;

    if(light.type === LIGHT_TYPES.pointLight) {
        return (
            <RenderedPointLight light={light} isSelected={false} />
        );
    }
    if(light.type === LIGHT_TYPES.spotLight) {
        return (
            <RenderedSpotLight light={light} isSelected={false} />
        );
    }
}