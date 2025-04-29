import React from 'react';

import { LightWrapper } from '../../../../models/Light';
import { ListedLightHeader } from './ListedLightHeader';
import { LightControls } from './LightControls';
import { ListedObjectBody } from '../common/submenus/ListedObjectBody';
import { useSceneObjectsContext } from '../../../common/contexts/SceneObjectsContext';
import { ButtonDeleteObject } from '../common/controls/ButtonDeleteObject';
import { ListedObject } from '../common/submenus/ListedObject';

type Props = {
    isActive: boolean,
    light: LightWrapper,

    toggleExtend: () => void,
}

export const ListedLight = ({ isActive, light, toggleExtend }: Props) => {
    const { deleteLight } = useSceneObjectsContext();

    return (
        <ListedObject>
            <ListedLightHeader isActive={isActive} light={light} toggleExtend={() => toggleExtend()} />
            <ListedObjectBody isVisible={isActive}>
                <ButtonDeleteObject handleDelete={() => deleteLight(light.id)} />
                <LightControls light={light} />
            </ListedObjectBody>
        </ListedObject>
    );
}