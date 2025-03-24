import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { DEFAULT_BLOOM_EFFECT, DEFAULT_DOF_EFFECT, DEFAULT_GLITCH_EFFECT, EFFECT_TYPES, EffectProperties, EffectType, EffectWrapper, INIT_EFFECTS_LIST } from "../../models/Effect";

type EffectsContext = {
    effectsList: EffectWrapper[],
    getAvailableEffects: () => EffectType[]
    addEffect: (type: EffectType) => void,
    updateEffectProperties: (type: EffectType, change: Partial<EffectProperties>) => void,
    deleteEffect: (type: EffectType) => void,
}

export const EffectsContext = createContext<EffectsContext | null>( null );

export const EffectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ effectsList, setEffectsList ] = useState<EffectWrapper[]>(INIT_EFFECTS_LIST)

    const getAvailableEffects = useCallback(() => {
        return Object.values(EFFECT_TYPES).filter(
            value => !effectsList.some(effect => effect.type === value)
        ) as EffectType[];
    }, [effectsList]);

    const addEffect = useCallback((type: EffectType) => {
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

    const updateEffectProperties = useCallback((type: EffectType, change: Partial<EffectProperties>) => {
        const index = effectsList.findIndex(effect => effect.type === type);
        if(index === -1) return;

        const newEffect = { ...effectsList[index] };
        newEffect.properties = { ...effectsList[index].properties, ...change };

        const newEffectsList = effectsList.map( (effect, i) => i===index ? newEffect : effect);
        setEffectsList(newEffectsList);
    }, [effectsList]);

    const deleteEffect = useCallback((type: EffectType)=> {
        const index = effectsList.findIndex(effect => effect.type === type);
        if(index === -1) return;

        const filteredEffects = effectsList.filter( (effect) => effect.type !== type );
        setEffectsList(filteredEffects);
    }, [effectsList])


    return (
        <EffectsContext.Provider value={{ effectsList, getAvailableEffects, addEffect, updateEffectProperties, deleteEffect }} >
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