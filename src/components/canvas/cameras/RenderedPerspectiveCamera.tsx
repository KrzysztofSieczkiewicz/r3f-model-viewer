import React, { useEffect } from "react";

import { CameraProperties, PerspectiveCameraProperties } from "../../../models/Camera";

import { PerspectiveCamera } from "@react-three/drei";
import { CameraBillboard } from "./CameraBillboard";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties,
    isSelected: boolean,
}

export const RenderedPerspectiveCamera = ( {id, properties, isSelected}: Props ) => {
    const { updateCameraProperties } = useCamerasContext();
    const { updateSelected } = useSidebarControlsContext();
    
    return (
        <group>
            {isSelected && 
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
                <CameraBillboard onClick={() => updateSelected(id) } />
            </PerspectiveCamera>
        </group>
    );
}