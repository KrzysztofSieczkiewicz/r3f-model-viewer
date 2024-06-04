import React from "react";

import { CAMERA_TYPES, CameraWrapper } from "../../../models/Camera";
import { RenderedPerspectiveCamera } from "./RenderedPerspectiveCamera";
import { RenderedOrtographicCamera } from "./RenderedOrtographicCamera";
import { useCamerasContext } from "../../contexts/CamerasContext";

export const Cameras = () => {
    const { camerasList } = useCamerasContext();

    const renderCamera = (camera: CameraWrapper)  => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <RenderedPerspectiveCamera key={camera.id} id={camera.id} properties={camera.properties} />
            case CAMERA_TYPES.ortographicCamera:
                return <RenderedOrtographicCamera key={camera.id} id={camera.id} properties={camera.properties} />
        }
    }

    return (
        <>
            {camerasList.map( (camera) => {
                return renderCamera(camera);
            })}
        </>
    );
}