import React from "react";
import { CAMERA_TYPES, CameraWrapper } from "../../../../models/Camera";
import { TraitSection } from "../common/traits/TraitSection";
import { CameraControlsOrtographic } from "./CameraControlsOrtographic";
import { CameraControlsPerspective } from "./CameraControlsPerspective";

type Props = {
    camera: CameraWrapper;
}

export const CameraControls = ({ camera }: Props) => { 

    const handleCameraType = () => {
        switch(camera.type) {
            case CAMERA_TYPES.ortographicCamera:
                return <CameraControlsOrtographic id={camera.id} properties={camera.properties} />
            case CAMERA_TYPES.perspectiveCamera:
                return <CameraControlsPerspective id={camera.id} properties={camera.properties} />
        }
    }

    return (
        <TraitSection>
            {handleCameraType()}
        </TraitSection>
    );
}