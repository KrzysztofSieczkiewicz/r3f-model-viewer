import React from "react";

import { CameraProperties, OrtographicCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";
import { useSceneValue } from "../../contexts/SceneContext";

import { OrthographicCamera } from "@react-three/drei";


type Props = {
    id: string,
    properties: OrtographicCameraProperties
}

export const RenderedOrtographicCamera = ( {id, properties}: Props ) => {
    const { updateCameraProperties } = useCamerasContext();
    const [ selectedObjectId, setScene ] = useSceneValue((scene)=> scene["selectedObjectId"]);
    
    return (
        <group>
            {selectedObjectId === id && 
                <CamerasGizmo
                    position={properties.position}
                    handleChange={(change: Partial<CameraProperties>) => { updateCameraProperties(id, change) }}
                />
            }
            <OrthographicCamera 
                position={properties.position}
            >
                <CameraBillboard onClick={() => setScene({selectedObjectId: id}) } />
            </OrthographicCamera>
        </group>
    
    );
}