import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { CAMERA_TYPES, CameraTypes, CameraWrapper, INIT_CAMERAS_LIST } from "../../models/Camera";

type CamerasContext = {
    camerasList: CameraWrapper[],
    addCamera: (type: CameraTypes) => void,
}

export const CamerasContext = createContext<CamerasContext | null>( null );

export const CamerasContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ camerasList, setCamerasList ] = useState<CameraWrapper[]>(INIT_CAMERAS_LIST)

    const addCamera = useCallback((type: CameraTypes) => {
        const newCamerasList = [...camerasList];
        switch(type) {
            case CAMERA_TYPES.perspectiveCamera:
                newCamerasList.push();
                break;
            case CAMERA_TYPES.ortographicCamera:
                newCamerasList.push();
                break;
        }

        setCamerasList(newCamerasList);
    }, [camerasList] );

    return (
        <CamerasContext.Provider value={{ camerasList, addCamera }} >
            {props.children}
        </CamerasContext.Provider>
    );
}

export const useCamerasContext = (): CamerasContext => {
    const context = useContext(CamerasContext);

    if (context === null) {
        throw new Error("useCamerasContext must be used within a CamerasContextProvider")
    }

    return context;
}