import React from "react";
import { LIGHT_TYPES, LightWrapper } from "./models/Light";

type Props = {
    lightsList: LightWrapper[]
}

export const Lights = (props: Props) => {
    const lightsList = props.lightsList;

    return (
        <>
            {lightsList.map((light) => {
                if (light.type === LIGHT_TYPES.pointLight && light.visible) {
                return <pointLight 
                    key={light.id} 
                    position={light.position}
                    rotation={light.rotation}
                    color={light.color} 
                    intensity={light.intensity} 
                    />;
                } else if (light.type === LIGHT_TYPES.spotLight && light.visible) {
                return <spotLight 
                    key={light.id} 
                    position={light.position}
                    rotation={light.rotation}
                    color={light.color} 
                    intensity={light.intensity}
                    angle={light.angle}
                    penumbra={light.penumbra}
                    />;
                } else {
                return null;
                }
            })}
        </>
    );
}