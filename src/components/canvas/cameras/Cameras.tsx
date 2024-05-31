import React from "react";

import { CAMERA_TYPES, CameraWrapper } from "../../../models/Camera";

export const Cameras = () => {

    const handleCameraType = (camera: CameraWrapper)  => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:

                break;
            
            case CAMERA_TYPES.ortographicCamera:

                break;
        }
    }

    // TODO: HANDLE A WHOLE ARRAY
    return (
        <>
            {handleCameraType}
        </>
    );
}