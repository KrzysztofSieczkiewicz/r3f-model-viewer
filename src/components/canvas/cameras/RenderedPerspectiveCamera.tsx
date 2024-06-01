import React from "react";

import { PerspectiveCameraProperties } from "../../../models/Camera";

import { PerspectiveCamera } from "@react-three/drei";



type Props = {
    properties: PerspectiveCameraProperties
}

export const RenderedPerspectiveCamera = ( {properties}: Props ) => {

    return (
        <PerspectiveCamera
            position={properties.position}
            aspect={properties.aspectRatio}
            fov={properties.fov}
        />
    );
}