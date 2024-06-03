import React from "react";
import { RenderedLight } from "./RenderedLight";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

export const Lights = () => {    
    const { lightsList } = useSceneObjectsContext();

    // TODO: ADD isSelected HANDLING

    return (
        lightsList.map((light) => {
            if (!light.properties.isVisible) return;
            return (
                <RenderedLight
                    key={light.id} 
                    light={light}
                />
            );
        })
    );
}