import React from "react";
import THREE, { Euler, Vector3 } from "three";
import { LightWrapper } from "./interfaces/light.model";

interface LightsArray {
    lightsList: LightWrapper[]
}

const Lights = ({ lightsList }: LightsArray) => (
    <>
        {
            lightsList
                .map((light) => {
                    const { type } = light;
                    if (type === THREE.PointLight && light.visible) {
                        return <pointLight
                            key={light.id}
                            position={light.position}
                            rotation={light.rotation}
                            color={light.color}
                            intensity={light.intensity}
                        />;
                    }

                    if (light.type === THREE.SpotLight && light.visible) {
                        return <spotLight
                            key={light.id}
                            position={light.position}
                            rotation={light.rotation}
                            color={light.color}
                            intensity={light.intensity}
                            angle={light.angle}
                            penumbra={light.penumbra}
                        />;
                    }
                })
                .filter(x => x)
        }
    </>
);

export default Lights;