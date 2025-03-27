import React from 'react';

import { LightWrapper } from '../../../../models/Light';
import { LightItemHeader } from './LightItemHeader';
import { MenuListItem } from '../../../../components/sidebar/commons/MenuListItem';
import { LightControls } from './LightControls';
import { ListedObjectBody } from '../common/submenu/ListedObjectBody';
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
            <LightItemHeader isActive={isActive} light={light} toggleExtend={() => toggleExtend()} />
            {isActive && 
            <ListedObjectBody>
                <DeleteItemButton deleteObject={() => deleteLight(light.id)} />
                <LightControls light={light} />
            </ListedObjectBody>}
        </MenuListItem>
    );
}