import React from 'react';

import { EffectWrapper } from '../../../../models/Effect';
import { ListedEffectHeader } from './ListedEffectHeader';
import { MenuListItem } from '../../../../components/sidebar/commons/MenuListItem';
import { EffectControls } from './EffectControls';
import { ListedObjectBody } from '../common/submenu/ListedObjectBody';
import { useEffectsContext } from '../../../../components/contexts/EffectsContext';
import { DeleteItemButton } from '../../../../components/sidebar/common/DeleteItemButton';


type Props = {
    isActive: boolean,
    effect: EffectWrapper
    toggleExtend: () => void
}

export const ListedEffect = ( {isActive, effect, toggleExtend}: Props) => {
    const {deleteEffect} = useEffectsContext();

    return (
        <MenuListItem isActive={isActive}>
            <ListedEffectHeader effect={effect} isActive={isActive} toggleExtend={() => toggleExtend()} />
            {isActive && 
            <ListedObjectBody>
                <DeleteItemButton deleteObject={() => deleteEffect(effect.type)} />
                <EffectControls effect={effect} />
            </ListedObjectBody>}
        </MenuListItem>
    );
}