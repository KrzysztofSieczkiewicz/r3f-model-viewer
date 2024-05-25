import React from "react";
import { useSceneValue } from "../../contexts/SceneContext";

export const AmbientLight = () => {
    const [ isAmbientActive ] = useSceneValue((scene) => scene['isAmbientActive']);
    const [ ambientColor ] = useSceneValue((scene) => scene['ambientColor']);
    const [ ambientIntensity ] = useSceneValue((scene) => scene['ambientIntensity']);

    return (
        <>
            {isAmbientActive && 
                <ambientLight 
                    color={ambientColor} 
                    intensity={ambientIntensity} />
            }
        </>
    );
}