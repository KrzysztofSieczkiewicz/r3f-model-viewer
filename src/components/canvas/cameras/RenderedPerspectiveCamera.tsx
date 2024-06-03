import React from "react";

import { CameraProperties, PerspectiveCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";
import { useSceneValue } from "../../contexts/SceneContext";

import { PerspectiveCamera } from "@react-three/drei";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties,
}

export const RenderedPerspectiveCamera = ( {id, properties}: Props ) => {
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
            <PerspectiveCamera
                position={properties.position}
                aspect={properties.aspectRatio}
                fov={properties.fov}
            >
                <CameraBillboard onClick={() => setScene({selectedObjectId: id}) } />
            </PerspectiveCamera>
        </group>
    );
}