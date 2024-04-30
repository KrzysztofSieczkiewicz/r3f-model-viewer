import React from "react";
import { RenderedLight } from "./RenderedLight";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

export const Lights = () => {    
    const { lightsList } = useSceneObjectsContext();
    const { selectedId } = useSidebarControlsContext();


    // TODO: ADD isSelected HANDLING

    return (
        lightsList.map((light) => {
            if (!light.visible) return;
            return (
                <RenderedLight
                    key={light.id} 
                    light={light}
                    isSelected={selectedId === light.id}
                />
            );
        })
    );
}