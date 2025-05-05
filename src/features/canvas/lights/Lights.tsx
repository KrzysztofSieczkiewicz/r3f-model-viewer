import React from "react";
import { LIGHT_TYPES, LightWrapper } from "../../../models/Light";
import { RenderedPointLight } from "./RenderedPointLight";
import { RenderedSpotLight } from "./RenderedSpotLight";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { RenderedDirectionalLight } from "./RenderedDirectionalLight";

export const Lights = () => {    
    const { lightsList } = useSceneObjectsContext();

    const handleLightType = (light: LightWrapper) => {
        switch(light.type) {
            case LIGHT_TYPES.pointLight:
                return <RenderedPointLight key={light.id} light={light} />

            case LIGHT_TYPES.spotLight:
                return <RenderedSpotLight key={light.id} light={light} />

            case LIGHT_TYPES.directionalLight:
                return <RenderedDirectionalLight key={light.id} light={light} />
        }
    }

    return (
        lightsList.map((light) => {
            if (!light.properties.isVisible) return;
            return handleLightType(light);
        })
    );
}