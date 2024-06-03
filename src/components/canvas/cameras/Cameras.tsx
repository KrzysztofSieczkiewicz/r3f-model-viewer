import React from "react";

import { CAMERA_TYPES, CameraWrapper } from "../../../models/Camera";
import { RenderedPerspectiveCamera } from "./RenderedPerspectiveCamera";
import { RenderedOrtographicCamera } from "./RenderedOrtographicCamera";
import { useCamerasContext } from "../../contexts/CamerasContext";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";

export const Cameras = () => {
    const { camerasList } = useCamerasContext();
    const { selectedId } = useSidebarControlsContext();

    const renderCamera = (camera: CameraWrapper)  => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <RenderedPerspectiveCamera key={camera.id} id={camera.id} properties={camera.properties} isSelected={selectedId === camera.id} />
            case CAMERA_TYPES.ortographicCamera:
                return <RenderedOrtographicCamera key={camera.id} id={camera.id} properties={camera.properties} isSelected={selectedId === camera.id} />
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