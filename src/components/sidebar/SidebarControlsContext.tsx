import React, { useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { INITIAL_SCENE_SETTINGS, SceneWrapper } from '../../models/Scene';
import { AssetWrapper, INIT_ASSET_LIST } from "../../models/Asset";
import { INIT_LIGHTS_LIST, LightWrapper } from "../../models/Light";

export type EditableWrapper = AssetWrapper | LightWrapper

type SidebarControlsContext = {
    lightsList: LightWrapper[], 
    updateLight: (id:string, property:keyof LightWrapper, value:any) => void, 

    assetsList: AssetWrapper[], 
    updateAssetProperty: (id:string, property:keyof AssetWrapper, value:any) => void,

    selectedId: string,
    updateSelected: (objectId:string) => void,

    scene: SceneWrapper, 
    updateScene: (property:string, value:any) => void,
}

export const SidebarControlsContext = createContext<SidebarControlsContext | null>( null );

export const SidebarControlsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);
    const [ selectedId, setSelectedId ] = useState<string>("");
    const [ scene, setScene ] = useState<SceneWrapper>(INITIAL_SCENE_SETTINGS); 


    const updateLight = (id: string, property: keyof LightWrapper, value: number) => {
      const index = lightsList.findIndex(light => light.id === id);
      const newLight: LightWrapper = {
          ...lightsList[index],
          [property]: value
      };

      if (newLight[property] !== (lightsList)[index][property]) {
          const newLightsList = [...lightsList];
          newLightsList[index] = newLight;
          
          setLightsList(newLightsList);
      }
    }

    const updateAssetProperty = (id: string, property: keyof AssetWrapper, value: any) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        const newAsset: AssetWrapper = {
            ...assetsList[index],
            [property]: value
        };

        if (newAsset[property] !== (assetsList)[index][property]) {
            const newAssetsList = [...assetsList];
            (newAssetsList[index]) = newAsset;

            setAssetsList(newAssetsList);
        }
    }

    const updateScene = (property: string, value: any) => {
      const updateNested = (obj: any, keys: any, value: any) => {
        if (keys.length === 1) {
          obj[keys[0]] = value;
        } else {
          const key = keys.shift();
          updateNested(obj[key], keys, value);
        }
      };

      const keys = property.split('.');
      const updatedScene = { ...scene };
      updateNested(updatedScene, keys, value);

      setScene({
        ...scene,
        [property]: value
      });
    }

    // TODO: INTRODUCE MORE SENSIBLE SELECTION LOGIC
    const updateSelected = (objectId: string) => {
      if ( selectedId === objectId ) {
        setSelectedId("");
      }
      else {
        setSelectedId(objectId);
      }
    }

    return (
        <SidebarControlsContext.Provider value={{ lightsList, updateLight, assetsList, updateAssetProperty, scene, updateScene, selectedId, updateSelected }} >
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