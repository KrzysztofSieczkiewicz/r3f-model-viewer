import React from "react";
import { Euler } from "three/src/math/Euler";
import { Vector3 } from "three/src/math/Vector3";

type Props = {
    lightsList: LightWrapper[]
}

type LightWrapper = {
    id: string,
    position: number[],
    rotation: number[],
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    visible: boolean,
    type: string,
}

export const Lights = (props: Props) => {
    const lightsList = props.lightsList;

    return (
        <>
            {lightsList.map((light) => {
                if (light.type === 'pointLight' && light.visible) {
                return <pointLight 
                    key={light.id} 
                    position={new Vector3(...light.position)}
                    rotation={new Euler(...light.rotation)}
                    color={light.color} 
                    intensity={light.intensity} 
                    />;
                } else if (light.type === 'spotLight' && light.visible) {
                return <spotLight 
                    key={light.id} 
                    position={new Vector3(...light.position)}
                    rotation={new Euler(...light.rotation)}
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