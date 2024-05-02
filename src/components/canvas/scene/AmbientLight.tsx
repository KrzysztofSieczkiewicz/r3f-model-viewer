import React from "react";
import { useSceneContext } from "../../contexts/SceneContext";

export const AmbientLight = () => {
    const [ scene ] = useSceneContext();

    return (
        <ambientLight 
            color={scene.ambientColor} 
            intensity={scene.ambientIntensity} 
        />
    );
}