import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { EffectWrapper, INIT_EFFECTS_LIST } from "../../models/Effect";

type EffectsContext = {
    effectsList: EffectWrapper[],
    updateEffect: (effect: EffectWrapper) => void;
}

export const EffectsContext = createContext<EffectsContext | null>( null );

export const EffectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ effectsList, setEffectsList ] = useState<EffectWrapper[]>(INIT_EFFECTS_LIST)

    const updateEffect = useCallback((newEffect: EffectWrapper) => {
      const index = effectsList.findIndex(effect => newEffect.id === effect.id);

      const newEffectsList = [...effectsList];
      newEffectsList[index] = newEffect;

      setEffectsList(newEffectsList);
  }, [effectsList]);

    return (
        <EffectsContext.Provider value={{ effectsList, updateEffect }} >
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