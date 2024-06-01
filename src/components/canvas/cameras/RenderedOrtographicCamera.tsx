import React from "react";

import { OrthographicCamera } from "@react-three/drei";
import { OrtographicCameraProperties } from "../../../models/Camera";


type Props = {
    properties: OrtographicCameraProperties;
}

export const RenderedOrtographicCamera = ( {properties}: Props ) => {
    
    return (
        <OrthographicCamera 
            position={properties.position}
        
        />
    );
}