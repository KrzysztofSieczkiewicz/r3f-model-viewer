import React from "react";

import { CameraProperties, PerspectiveCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";

import { PerspectiveCamera } from "@react-three/drei";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties,
}

export const RenderedPerspectiveCamera = ( {id, properties}: Props ) => {
    const { updateCameraProperties } = useCamerasContext();
    
    const isSelected = useIsSelected(id);
    const handleSelect = useToggleSelect(id);
    
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
                <CameraBillboard onClick={handleSelect} />
            </PerspectiveCamera>
        </group>
    );
}