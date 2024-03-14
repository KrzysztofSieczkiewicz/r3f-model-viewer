import React, { useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { SceneWrapper, defaultScene } from '../../models/Scene';
import { AssetWrapper, INIT_ASSET_LIST } from "../../models/Asset";
import { INIT_LIGHTS_LIST, LightWrapper } from "../../models/Light";


type SidebarControlsContext =  {
    lightsList: LightWrapper[], 
    updateLight: (id:string, property: keyof LightWrapper, value:any) => void, 
    assetsList: AssetWrapper[], 
    updateAssetProperty: (id:string, property: keyof AssetWrapper, value:any) => void,
    scene: SceneWrapper, 
    updateScene: (property:string, value:any) => void,
    updateObject: (list: any[], id: string, property: keyof any, value: any) => void
}

export const SidebarControlsContext = createContext<SidebarControlsContext | null>( null );

export const SidebarControlsContextProvider = (props: {children: ReactNode}): JSX.Element => {



    /* ASSETS */
    const [assetsList, setAssetsList] = useState<AssetWrapper[]>(INIT_ASSET_LIST);

        /* LIGHTS */
        const [lightsList, setLightsList] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);

    const updateLight = (id: string, property: keyof LightWrapper, value: number) => {
      const index = lightsList.findIndex(light => light.id === id);
      const newLight: any = {
          ...lightsList[index],
          [property]: value
      };

      if (newLight[property] !== (lightsList as any)[index][property]) {
          const newLightsList = [...lightsList];
          newLightsList[index] = newLight;

          console.log({newLightsList})
          
          setLightsList(newLightsList);
      }
    }
    // replace with updateAssetById => no point in separating properties when it's just creating new asset later on
    const updateAssetProperty = (id: string, property: keyof AssetWrapper, value: any) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        const newAsset = {
            ...assetsList[index],
            [property]: value
        };

        if (newAsset[property] !== (assetsList)[index][property]) {
            const newAssetsList = [...assetsList];
            (newAssetsList[index] as any) = newAsset;

            setAssetsList(newAssetsList);
        }
    }

    const updateObject = (list: any[], id: string, property: keyof any, value: any) => {
      const index = list.findIndex(object => object.id === id);
      const newObject: any = {
          ...list[index],
          [property]: value
      };

      if (newObject[property] !== (list as any)[index][property]) {
          const newList = [...list];
          (newList[index] as any) = newObject;

          setAssetsList(newList);
      }
  }

    /* SCENE */

    // TODO: zapytać na korkach
  const [ scene, setScene ] = useState(defaultScene); 
  
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

    return (
        <SidebarControlsContext.Provider value={{ lightsList, updateLight, assetsList, updateAssetProperty, scene, updateScene, updateObject }} >
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