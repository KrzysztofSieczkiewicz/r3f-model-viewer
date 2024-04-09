import React from "react";
import { LIGHT_TYPES, LightWrapper } from "../models/Light";
import { RenderedLight } from "./RenderedLight";

type Props = {
    lightsList: LightWrapper[]
}

export const Lights = (props: Props) => {
    const lightsList = props.lightsList;

    return (
        lightsList.map((light) => {
            if(light.visible) {
                return (
                    <RenderedLight
                        key={light.id} 
                        light={light}
                        isSelected={false} />
                );
            }
        })
    );
}