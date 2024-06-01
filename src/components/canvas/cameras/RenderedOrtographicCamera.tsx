import React from "react";

import { OrthographicCamera } from "@react-three/drei";
import { CameraWrapper, OrtographicCameraProperties } from "../../../models/Camera";
import { CameraBillboard } from "./CameraBillboard";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";


type Props = {
    id: string,
    properties: OrtographicCameraProperties;
}

export const RenderedOrtographicCamera = ( {id, properties}: Props ) => {
    const { updateSelected } = useSidebarControlsContext();
    
    return (
        <OrthographicCamera 
            position={properties.position}
        >
            <CameraBillboard onClick={() => updateSelected(id) } />
        </OrthographicCamera>
    
    );
}