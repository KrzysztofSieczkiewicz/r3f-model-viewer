import React from 'react';

import { CAMERA_TYPES, CameraWrapper } from "../../../models/Camera"
import { useCamerasContext } from '../../contexts/CamerasContext';
import { DeleteItemButton } from '../common/DeleteItemButton';
import { PerspectiveCameraControls } from './controlsTypes/PerspectiveCameraControls';
import { OrtogtaphicCameraControls } from './controlsTypes/OrtographicCameraControls';
import { CameraItemHeader } from './CameraItemHeader';
import { MenuListItem } from '../commons/MenuListItem';
import { ListItemBody } from '../commons/ListItemBody';


type Props = {
    isActive: boolean,
    camera: CameraWrapper,

    toggleExtend: () => void,
}

export const CameraItem = ( {isActive, camera, toggleExtend}: Props ) => {
    const { deleteCamera } = useCamerasContext();

    const renderCameraHeader = () => {
        return <CameraItemHeader isActive={isActive} camera={camera} toggleExtend={() => toggleExtend()} />
    }

    const renderCameraControls = () => {
        switch(camera.type) {
            case CAMERA_TYPES.perspectiveCamera:
                return <PerspectiveCameraControls id={camera.id} properties={camera.properties} />
            case CAMERA_TYPES.ortographicCamera:
                return <OrtogtaphicCameraControls id={camera.id} properties={camera.properties} />
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