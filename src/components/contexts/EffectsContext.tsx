import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { DEFAULT_BLOOM_EFFECT, DEFAULT_DOF_EFFECT, DEFAULT_GLITCH_EFFECT, EFFECT_TYPES, EffectProperties, EffectTypes, EffectWrapper, INIT_EFFECTS_LIST } from "../../models/Effect";

type EffectsContext = {
    effectsList: EffectWrapper[],
    addEffect: (type: EffectTypes) => void,
    updateEffectProperties: (type: EffectTypes, change: Partial<EffectProperties>) => void,
    deleteEffect: (type: EffectTypes) => void,
}

export const EffectsContext = createContext<EffectsContext | null>( null );

export const EffectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ effectsList, setEffectsList ] = useState<EffectWrapper[]>(INIT_EFFECTS_LIST)

    const addEffect = useCallback((type: EffectTypes) => {
        const index = effectsList.findIndex(effect => effect.type === type);
        if(index !== -1) return;

        const newEffectsList = [...effectsList];
        switch(type) {
            case EFFECT_TYPES.bloom:
                newEffectsList.push(DEFAULT_BLOOM_EFFECT);
                break;
            case EFFECT_TYPES.depthOfField:
                newEffectsList.push(DEFAULT_DOF_EFFECT);
                break;
            case EFFECT_TYPES.glitch:
                newEffectsList.push(DEFAULT_GLITCH_EFFECT);
                break;
        }

        setEffectsList(newEffectsList);
    }, [effectsList])

    const updateEffectProperties = useCallback((type: EffectTypes, change: Partial<EffectProperties>) => {
        const index = effectsList.findIndex(effect => effect.type === type);
        if(index === -1) return;

        const newEffect = { ...effectsList[index] };
        newEffect.properties = { ...effectsList[index].properties, ...change };

        const newEffectsList = effectsList.map( (effect, i) => i===index ? newEffect : effect);
        setEffectsList(newEffectsList);
    }, [effectsList]);

    const deleteEffect = useCallback((type: EffectTypes)=> {
        const index = effectsList.findIndex(effect => effect.type === type);
        if(index === -1) return;

        const filteredEffects = effectsList.filter( (effect) => effect.type !== type );
        setEffectsList(filteredEffects);
    }, [effectsList])


    return (
        <EffectsContext.Provider value={{ effectsList, addEffect, updateEffectProperties, deleteEffect }} >
            {props.children}
        </EffectsContext.Provider>
    );
}

export const useEffectsContext = (): EffectsContext => {
    const context = useContext(EffectsContext);

    if (context === null) {
        throw new Error("useEffectsContext must be used within a EffectsContextProvider")
    }

    return context;
}