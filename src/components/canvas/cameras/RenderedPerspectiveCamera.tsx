import React, { useRef } from "react";

import { CameraProperties, PerspectiveCameraProperties } from "../../../models/Camera";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";

import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { CameraHelper } from "three";
import { IconBillboard } from "../helperObjects/IconBillboard";
import { SelectionSphere } from "../helperObjects/SelectionSphere";

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
        <>
            {isSelected && 
                <CamerasGizmo
                    position={properties.position}
                    rotation={properties.rotation}
                    handleChange={(change: Partial<CameraProperties>) => { updateCameraProperties(id, change) }}
                />
            }
            <PerspectiveCamera
                ref={cameraRef}
                position={properties.position}
                rotation={properties.rotation}
                aspect={properties.aspectRatio}
                fov={properties.fov} >
                <SelectionSphere onClick={handleSelect} />
            </PerspectiveCamera>
            <IconBillboard position={properties.position} />
        </>
    );
}