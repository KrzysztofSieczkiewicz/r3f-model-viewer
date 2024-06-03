import React, { useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { INITIAL_SCENE_SETTINGS, SceneWrapper } from '../../models/Scene';

type SidebarControlsContext = {
    selectedId: string,
    updateSelected: (objectId:string) => void,

    scene: SceneWrapper, 
    updateScene: (property:string, value:any) => void,
}

// TODO: REMOVE REMAINING METHODS, MOVE THIS RESPONSIBILITY INTO SceneContext.tsx

export const SidebarControlsContext = createContext<SidebarControlsContext | null>( null );

export const SidebarControlsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ selectedId, setSelectedId ] = useState<string>("");
    const [ scene, setScene ] = useState<SceneWrapper>(INITIAL_SCENE_SETTINGS); 

    const updateScene = (property: string, value: any) => {
      const updateNested = (obj: any, keys: any, value: any) => {
        if (keys.length === 1) {
          obj[keys[0]] = value;
        } else {
          const key = keys.shift();
          updateNested(obj[key], keys, value);
        }
      }

      const keys = property.split('.');
      const updatedScene = { ...scene };
      updateNested(updatedScene, keys, value);

      setScene({
        ...scene,
        [property]: value
      });
    };

    const updateSelected = (objectId: string) => {
      if ( selectedId === objectId ) {
        setSelectedId("");
      }
      else {
        setSelectedId(objectId);
      }
    }

    return (
        <SidebarControlsContext.Provider value={{ scene, updateScene, selectedId, updateSelected }} >
            {props.children}
        </SidebarControlsContext.Provider>
    );
}

export const useSidebarControlsContext = (): SidebarControlsContext => {
    const context = useContext(SidebarControlsContext);

    if (context === null) {
        throw new Error("useSidebarControlsContext must be used within a SidebarControlsContextProvider")
    }

    return context;
}