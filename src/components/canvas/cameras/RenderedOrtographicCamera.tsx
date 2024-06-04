import React, { useRef } from "react";

import cameraBillboardIcon from '../../../icons/perspectiveCamera.svg';
import { CameraProperties, OrtographicCameraProperties } from "../../../models/Camera";
import { CamerasGizmo } from "./CamerasGizmo";
import { useCamerasContext } from "../../contexts/CamerasContext";

import { OrthographicCamera, useHelper } from "@react-three/drei";
import { useIsSelected, useToggleSelect } from "../../../hooks/useSelect";
import { SelectionSphere } from "../helperObjects/SelectionSphere";
import { IconBillboard } from "../helperObjects/IconBillboard";
import { CameraHelper } from "three";


type Props = {
    id: string,
    properties: OrtographicCameraProperties
}

export const RenderedOrtographicCamera = ( {id, properties}: Props ) => {
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
            <OrthographicCamera
                ref={cameraRef}
                position={properties.position}
                rotation={properties.rotation}
            >
                <SelectionSphere onClick={handleSelect}/>
            </OrthographicCamera>
            <IconBillboard icon={cameraBillboardIcon} position={properties.position} />
        </>
    );
}