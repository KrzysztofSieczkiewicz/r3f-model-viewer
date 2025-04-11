import React from 'react';

import { LightWrapper } from '../../../../models/Light';
import { ListedLightHeader } from './ListedLightHeader';
import { MenuListItem } from '../../../../components/sidebar/commons/MenuListItem';
import { LightControls } from './LightControls';
import { ListedObjectBody } from '../common/submenus/ListedObjectBody';
import { useSceneObjectsContext } from '../../../../components/contexts/SceneObjectsContext';
import { DeleteItemButton } from '../../../../components/sidebar/common/DeleteItemButton';

type Props = {
    isActive: boolean,
    light: LightWrapper,

    toggleExtend: () => void,
}

export const ListedLight = ({ isActive, light, toggleExtend }: Props) => {
    const { deleteLight } = useSceneObjectsContext();

    return (
        <MenuListItem isActive={isActive}>
            <ListedLightHeader isActive={isActive} light={light} toggleExtend={() => toggleExtend()} />
            {isActive && 
            <ListedObjectBody>
                <DeleteItemButton deleteObject={() => deleteLight(light.id)} />
                <LightControls light={light} />
            </ListedObjectBody>}
        </MenuListItem>
    );
}