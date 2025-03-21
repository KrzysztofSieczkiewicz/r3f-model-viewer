import React from 'react';

import { CAMERA_TYPES, CameraWrapper } from "../../../../models/Camera"
import { DeleteItemButton } from '../../../../components/sidebar/common/DeleteItemButton';
import { CameraControlsPerspective } from './CameraControlsPerspective';
import { CameraControlsOrtographic } from './CameraControlsOrtographic';
import { ListedCameraHeader } from './ListedCameraHeader';
import { MenuListItem } from '../../../../components/sidebar/commons/MenuListItem';
import { ListItemBody } from '../../../../components/sidebar/commons/ListItemBody';
import { useSceneObjectsContext } from '../../../../components/contexts/SceneObjectsContext';


type Props = {
    isActive: boolean,
    camera: CameraWrapper,

    toggleExtend: () => void,
}

export const ListedCamera = ( {isActive, camera, toggleExtend}: Props ) => {
    const { deleteCamera } = useSceneObjectsContext();

    const renderCameraHeader = () => {
        return <ListedCameraHeader isActive={isActive} camera={camera} toggleExtend={() => toggleExtend()} />
    }

    const renderCameraControls = () => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <CameraControlsPerspective id={camera.id} properties={camera.properties} />
            case CAMERA_TYPES.ortographicCamera:
                return <CameraControlsOrtographic id={camera.id} properties={camera.properties} />
        }
    }
    
    return (
        <MenuListItem isActive={isActive}>
            {renderCameraHeader()}
            
            {isActive &&
            <ListItemBody>
                <DeleteItemButton deleteObject={() => deleteCamera(camera.id)}/>
                {renderCameraControls()}
            </ListItemBody>
            }
        </MenuListItem>
    );
}