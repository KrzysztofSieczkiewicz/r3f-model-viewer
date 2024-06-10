import React, { useCallback, useContext, ReactNode, createContext, useState } from "react";

import { CAMERA_TYPES, CameraProperties, CameraTypes, CameraWrapper, DEFAULT_ORTOGRAPHIC_CAMERA, DEFAULT_PERSPECTIVE_CAMERA, INIT_CAMERAS_LIST } from "../../models/Camera";


type CamerasContext = {
    camerasList: CameraWrapper[],
    addCamera: (type: CameraTypes) => void,
    updateCameraProperties: (id: string, change: Partial<CameraProperties>) => void,
    deleteCamera: (id: string) => void,
}

export const CamerasContext = createContext<CamerasContext | null>( null );

export const CamerasContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ camerasList, setCamerasList ] = useState<CameraWrapper[]>(INIT_CAMERAS_LIST)

    const addCamera = useCallback((type: CameraTypes) => {
        const newCamerasList = [...camerasList];
        switch(type) {
            case CAMERA_TYPES.perspectiveCamera:
                newCamerasList.push(DEFAULT_PERSPECTIVE_CAMERA);
                break;
            case CAMERA_TYPES.ortographicCamera:
                newCamerasList.push(DEFAULT_ORTOGRAPHIC_CAMERA);
                break;
        }
        setCamerasList(newCamerasList);
    }, [camerasList]);

    const deleteCamera = useCallback((id: string) => {
        const index = camerasList.findIndex(camera => camera.id === id);
        if (index === -1) return;

        const filteredCameras = camerasList.filter((camera) => camera.id !== id );
        setCamerasList(filteredCameras);
    }, [camerasList]);

    const updateCameraProperties = useCallback((id: string, change: Partial<CameraProperties>) => {
        const index = camerasList.findIndex(light => light.id === id);
        if (index === -1) return;

        const newCamera = { ...camerasList[index] };
        newCamera.properties = { ...camerasList[index].properties, ...change }

        const newCamerasList = camerasList.map( (camera, i) => i===index ? newCamera : camera);
        setCamerasList(newCamerasList);
    }, [camerasList])

    return (
        <CamerasContext.Provider value={{ camerasList, addCamera, updateCameraProperties, deleteCamera }} >
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