import React, { useRef } from "react";

import { CameraProperties, PerspectiveCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";

import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { CameraHelper } from "three";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties,
}

export const RenderedPerspectiveCamera = ( {id, properties}: Props ) => {
    const { updateCameraProperties } = useCamerasContext();

    const cameraRef = useRef(null);
    
    const isSelected = useIsSelected(id);
    const handleSelect = useToggleSelect(id);

    useHelper(isSelected && cameraRef as any, CameraHelper);
    
    return (
        <group>
            {isSelected && 
                <CamerasGizmo
                    position={properties.position}
                    handleChange={(change: Partial<CameraProperties>) => { updateCameraProperties(id, change) }}
                />
            }
            <PerspectiveCamera
                ref={cameraRef}
                position={properties.position}
                aspect={properties.aspectRatio}
                fov={properties.fov}
            >
                <CameraBillboard onClick={handleSelect} />
            </PerspectiveCamera>
        </group>
    );
}