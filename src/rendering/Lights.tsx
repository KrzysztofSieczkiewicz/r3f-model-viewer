import React from "react";
import { LightWrapper } from "../models/Light";
import { RenderedLight } from "./RenderedLight";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";

type Props = {
    lightsList: LightWrapper[]
}

export const Lights = ({lightsList}: Props) => {    
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