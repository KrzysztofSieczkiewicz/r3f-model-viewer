import React from "react";
import { useSceneValue } from "../../contexts/SceneContext";

export const AmbientLight = () => {
    const [ ambientColor ] = useSceneValue((scene) => scene['ambientColor']);
    const [ ambientIntensity ] = useSceneValue((scene) => scene['ambientIntensity']);

    return (
        <ambientLight 
            color={ambientColor} 
            intensity={ambientIntensity} 
        />
    );
}