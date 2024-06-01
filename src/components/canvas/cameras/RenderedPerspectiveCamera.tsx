import React, { useEffect } from "react";

import { PerspectiveCameraProperties } from "../../../models/Camera";

import { PerspectiveCamera } from "@react-three/drei";
import { CameraBillboard } from "./CameraBillboard";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";

type Props = {
    id: string,
    properties: PerspectiveCameraProperties,
}

export const RenderedPerspectiveCamera = ( {id, properties}: Props ) => {
    const { updateSelected } = useSidebarControlsContext();
    
    return (
        <PerspectiveCamera
            position={properties.position}
            aspect={properties.aspectRatio}
            fov={properties.fov}
        >
            <CameraBillboard onClick={() => updateSelected(id) } />
        </PerspectiveCamera>
    );
}