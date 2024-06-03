import React from "react";
import { LIGHT_TYPES, LightWrapper } from "../../../models/Light";
import { RenderedPointLight } from "./RenderedPointLight";
import { RenderedSpotLight } from "./RenderedSpotLight";

type Props = {
    light: LightWrapper,
    isSelected: boolean,
}

// TODO: DISSOLVE THIS INTO Lights.tsx
export const RenderedLight = ( {light, isSelected}: Props) => {

    if(!light.properties.isVisible) return;

    if(light.type === LIGHT_TYPES.pointLight) {
        return (
            <RenderedPointLight light={light} isSelected={isSelected} />
        );
    }
    if(light.type === LIGHT_TYPES.spotLight) {
        return (
            <RenderedSpotLight light={light} isSelected={isSelected} />
        );
    }
}