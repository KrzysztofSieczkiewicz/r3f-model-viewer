import React from "react";
import { LightWrapper } from "../models/Light";
import { RenderedLight } from "./RenderedLight";

type Props = {
    lightsList: LightWrapper[]
}

export const Lights = (props: Props) => {
    const lightsList = props.lightsList;

    // TODO: ADD isSelected HANDLING

    return (
        lightsList.map((light) => {
            if (!light.visible) return;
            return (
                <RenderedLight
                    key={light.id} 
                    light={light}
                    isSelected={false} 
                />
            );
        })
    );
}