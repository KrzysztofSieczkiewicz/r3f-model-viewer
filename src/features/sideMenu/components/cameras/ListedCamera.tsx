import React from 'react';

import { CAMERA_TYPES, CameraWrapper } from "../../../../models/Camera"
import { ButtonDeleteObject } from '../common/controls/ButtonDeleteObject';
import { CameraControlsPerspective } from './CameraControlsPerspective';
import { CameraControlsOrtographic } from './CameraControlsOrtographic';
import { ListedCameraHeader } from './ListedCameraHeader';
import { useSceneObjectsContext } from '../../../common/contexts/SceneObjectsContext';
import { ListedObject } from '../common/submenus/ListedObject';
import { ListedObjectBody } from '../common/submenus/ListedObjectBody';
import { CameraControls } from './CameraControls';


type Props = {
    isActive: boolean,
    camera: CameraWrapper,

    toggleExtend: () => void,
}

export const ListedCamera = ( {isActive, camera, toggleExtend}: Props ) => {
    const { deleteCamera } = useSceneObjectsContext();

    const renderCameraControls = () => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <CameraControlsPerspective id={camera.id} properties={camera.properties} />
            case CAMERA_TYPES.ortographicCamera:
                return <CameraControlsOrtographic id={camera.id} properties={camera.properties} />
        }
    }
    
    return (
        <ListedObject isActive={isActive}>
            <ListedCameraHeader isActive={isActive} camera={camera} toggleExtend={() => toggleExtend()} />
            {isActive &&
            <ListedObjectBody>
                <ButtonDeleteObject handleDelete={() => deleteCamera(camera.id)}/>
                <CameraControls camera={camera} />
            </ListedObjectBody>
            }
        </ListedObject>
    );
}