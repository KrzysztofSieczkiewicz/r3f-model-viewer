import React from 'react';

import { LIGHT_TYPES, LightWrapper } from '../../../models/Light';
import { PointLightControls } from './controlsTypes/PointLightControls';
import { SpotLightControls } from './controlsTypes/SpotLightControls';
import { useSceneObjectsContext } from '../../contexts/SceneObjectsContext';
import { LightItemHeader } from './LightItemHeader';
import { MenuListItem } from '../commons/MenuListItem';

type Props = {
    isActive: boolean,
    light: LightWrapper,

    toggleExtend: () => void,
}

export const LightItem = ({ isActive, light, toggleExtend }: Props) => {
    const { deleteLight } = useSceneObjectsContext();

    const renderLightControls = () => {
        switch(light.type) {
            case LIGHT_TYPES.pointLight:
                return <PointLightControls id={light.id} properties={light.properties} />
            case LIGHT_TYPES.spotLight:
                return <SpotLightControls id={light.id} properties={light.properties} />
        }
    }

    return (
        <MenuListItem isActive={isActive}>
            <LightItemHeader isActive={isActive} light={light} toggleExtend={() => toggleExtend()} />
            {isActive && renderLightControls()}
        </MenuListItem>
    );
}