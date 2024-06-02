import React from "react";

import { OrthographicCamera } from "@react-three/drei";
import { CameraProperties, CameraWrapper, OrtographicCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";


type Props = {
    id: string,
    properties: OrtographicCameraProperties,
    isSelected: boolean
}

export const RenderedOrtographicCamera = ( {id, properties, isSelected}: Props ) => {
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
            <OrthographicCamera 
                position={properties.position}
            >
                <CameraBillboard onClick={() => updateSelected(id) } />
            </OrthographicCamera>
        </group>
    
    );
}