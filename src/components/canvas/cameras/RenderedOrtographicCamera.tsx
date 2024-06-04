import React from "react";

import { CameraProperties, OrtographicCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";

import { OrthographicCamera } from "@react-three/drei";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";


type Props = {
    id: string,
    properties: OrtographicCameraProperties
}

export const RenderedOrtographicCamera = ( {id, properties}: Props ) => {
    const { updateCameraProperties } = useCamerasContext();
    
    const isSelected = useIsSelected(id);
    const handleSelect = useToggleSelect(id);
    
    return (
        <group>
            {isSelected && 
                <CamerasGizmo
                    position={properties.position}
                    rotation={properties.rotation}
                    handleChange={(change: Partial<CameraProperties>) => { updateCameraProperties(id, change) }}
                />
            }
            <OrthographicCamera
                position={properties.position}
                rotation={properties.rotation}
            >
                <CameraBillboard onClick={handleSelect} />
            </OrthographicCamera>
        </group>
    );
}