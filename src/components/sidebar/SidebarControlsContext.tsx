import React, { useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { INITIAL_SCENE_SETTINGS, SceneWrapper } from '../../models/Scene';
import { AssetWrapper, INIT_ASSET_LIST } from "../../models/Asset";
import { INIT_LIGHTS_LIST, LightWrapper } from "../../models/Light";
import { EffectWrapper, INIT_EFFECTS_LIST } from "../../models/Effect";

export type EditableWrapper = AssetWrapper | LightWrapper

type SidebarControlsContext = {
    lightsList: LightWrapper[], 
    updateLight: (newLight: LightWrapper) => void,

    assetsList: AssetWrapper[], 
    updateAsset: (newAsset: AssetWrapper) => void,

    effectsList: EffectWrapper[],
    updateEffectProperty: (id:string, property:keyof EffectWrapper, value:any) => void,

    selectedId: string,
    updateSelected: (objectId:string) => void,

    scene: SceneWrapper, 
    updateScene: (property:string, value:any) => void,
}

export const SidebarControlsContext = createContext<SidebarControlsContext | null>( null );

export const SidebarControlsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);
    const [ effectsList, setEffectsList ] = useState<EffectWrapper[]>(INIT_EFFECTS_LIST)
    const [ selectedId, setSelectedId ] = useState<string>("");
    const [ scene, setScene ] = useState<SceneWrapper>(INITIAL_SCENE_SETTINGS); 

    const updateLight = (newLight: LightWrapper) => {
      const index = lightsList.findIndex(asset => asset.id === newLight.id);

      const newLightsList = [...lightsList];
      newLightsList[index] = newLight;

      setLightsList(newLightsList);
    };

    const updateAsset = (newAsset: AssetWrapper) => {
      const index = assetsList.findIndex(asset => asset.id === newAsset.id);

      const newAssetsList = [...assetsList];
      newAssetsList[index] = newAsset;

      setAssetsList(newAssetsList);
    };

    const updateEffectProperty = (id: string, property: keyof EffectWrapper, value: any) => {
      const index = effectsList.findIndex(effect => effect.id === id);
        const newEffect: EffectWrapper = {
            ...effectsList[index],
            [property]: value
        };

        if (newEffect[property] !== (effectsList)[index][property]) {
            const newEffectsList = [...effectsList];
            (newEffectsList[index]) = newEffect;

            setEffectsList(newEffectsList);
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
        <SidebarControlsContext.Provider value={{ lightsList, updateLight, assetsList, updateAsset, effectsList, updateEffectProperty, scene, updateScene, selectedId, updateSelected }} >
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