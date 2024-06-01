import React from "react";

import { CAMERA_TYPES, CameraWrapper } from "../../../models/Camera";
import { RenderedPerspectiveCamera } from "./RenderedPerspectiveCamera";
import { RenderedOrtographicCamera } from "./RenderedOrtographicCamera";

export const Cameras = () => {

    const handleCameraType = (camera: CameraWrapper)  => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <RenderedPerspectiveCamera properties={camera.properties} />
            case CAMERA_TYPES.ortographicCamera:
                return <RenderedOrtographicCamera properties={camera.properties} />
        }
    }

    // TODO: HANDLE A WHOLE ARRAY INSTEAD
    return (
        <>
            {handleCameraType}
        </>
    );
}