import React from 'react';

import { EffectWrapper } from '../../../../models/Effect';
import { ListedEffectHeader } from './ListedEffectHeader';
import { EffectControls } from './EffectControls';
import { ListedObjectBody } from '../common/submenus/ListedObjectBody';
import { useEffectsContext } from '../../../common/contexts/EffectsContext';
import { ButtonDeleteObject } from '../common/controls/ButtonDeleteObject';
import { ListedObject } from '../common/submenus/ListedObject';


type Props = {
    isActive: boolean,
    effect: EffectWrapper
    toggleExtend: () => void
}

export const ListedEffect = ( {isActive, effect, toggleExtend}: Props) => {
    const {deleteEffect} = useEffectsContext();

    return (
        <ListedObject isActive={isActive}>
            <ListedEffectHeader effect={effect} isActive={isActive} toggleExtend={() => toggleExtend()} />
            {isActive && 
            <ListedObjectBody>
                <ButtonDeleteObject handleDelete={() => deleteEffect(effect.type)} />
                <EffectControls effect={effect} />
            </ListedObjectBody>}
        </ListedObject>
    );
}