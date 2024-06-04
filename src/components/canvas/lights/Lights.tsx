import React from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { LIGHT_TYPES, LightWrapper } from "../../../models/Light";
import { RenderedPointLight } from "./RenderedPointLight";
import { RenderedSpotLight } from "./RenderedSpotLight";

export const Lights = () => {    
    const { lightsList } = useSceneObjectsContext();

    const handleLightType = (light: LightWrapper) => {
        switch(light.type) {
            case LIGHT_TYPES.pointLight:
                return <RenderedPointLight light={light} />

            case LIGHT_TYPES.spotLight:
                return <RenderedSpotLight light={light} />
        }
    }

    return (
        lightsList.map((light) => {
            if (!light.properties.isVisible) return;
            return handleLightType(light);
        })
    );
}