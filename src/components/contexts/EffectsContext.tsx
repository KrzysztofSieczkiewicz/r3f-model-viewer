import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { EffectProperties, EffectTypes, EffectWrapper, INIT_EFFECTS_LIST } from "../../models/Effect";

type EffectsContext = {
    effectsList: EffectWrapper[],
    updateEffectProperties: (type: EffectTypes, change: Partial<EffectProperties>) => void;
}

export const EffectsContext = createContext<EffectsContext | null>( null );

export const EffectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ effectsList, setEffectsList ] = useState<EffectWrapper[]>(INIT_EFFECTS_LIST)


    const updateEffectProperties = useCallback((type: EffectTypes, change: Partial<EffectProperties>) => {
        const index = effectsList.findIndex(effect => effect.type === type);
        if(index === -1) return;

        const newEffect = { ...effectsList[index] };
        newEffect.properties = { ...effectsList[index].properties, ...change };

        const newEffectsList = effectsList.map( (effect, i) => i==index ? newEffect : effect);
        setEffectsList(newEffectsList);
    }, [effectsList]);  


    return (
        <EffectsContext.Provider value={{ effectsList, updateEffectProperties }} >
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