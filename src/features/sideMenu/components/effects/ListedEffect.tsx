import React from 'react';

import { EffectWrapper } from '../../../../models/Effect';
import { ListedEffectHeader } from './ListedEffectHeader';
import { MenuListItem } from '../../../../components/sidebar/commons/MenuListItem';
import { EffectControls } from './EffectControls';
import { ListedObjectBody } from '../common/submenus/ListedObjectBody';
import { useEffectsContext } from '../../../../components/contexts/EffectsContext';
import { ButtonDeleteObject } from '../common/controls/ButtonDeleteObject';


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
                <ButtonDeleteObject handleDelete={() => deleteEffect(effect.type)} />
                <EffectControls effect={effect} />
            </ListedObjectBody>}
        </MenuListItem>
    );
}