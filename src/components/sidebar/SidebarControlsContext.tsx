import React, { MutableRefObject, useContext } from "react";
import { ReactNode, createContext, useState } from "react";
import { nanoid } from 'nanoid';

import { defaultScene } from '../../models/SceneModel';


type SidebarControlsContext =  {
    lightsList: Light[], 
    updateLight: (id:string, property: keyof Light, value:any) => void, 
    assetsList: Asset[], 
    updateAssetProperty: (id:string, property: keyof Asset, value:any) => void,
    scene: Scene, 
    updateScene: (property:string, value:any) => void
}

type Light = {
    id: string,
    position: number[],
    rotation: number[],
    color: string,
    intensity: number,
    angle: number,
    penumbra: number,
    visible: boolean,
    type: string,
}

type Asset = {
    id: string,
    object: string,
    name: string,
    position: number[],
    rotation: number[],
    scale: number[],
    ref: HTMLDivElement | null,
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
    isSelected: boolean,
}

type Scene = {
    backgroundColor: string,
    ambientLight: {
      color: string,
      intensity: number
    }
  }

export const SidebarControlsContext = createContext<SidebarControlsContext | null>( null );

export const SidebarControlsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    /* LIGHTS */
    const [lightsList, setLightsList] = useState<Light[]>([
        {
        id:nanoid(5),
        position:[5,5,0],
        rotation:[Math.PI * 0.5, Math.PI * 0.5, 0],
        color: "#f53259",
        intensity:1,
        angle: 0.1,
        penumbra: 0.6,
        type:"spotLight",
        visible: true
      },{
        id:nanoid(5),
        position:[-5,5,-5],
        rotation:[0,0,0],
        color:"#33dcfa",
        intensity:1,
        angle: 0.1,
        penumbra: 0.6,
        type:"pointLight",
        visible: true
      }
    ]);

    const updateLight = (id: string, property: keyof Light, value: number) => {
    const index = lightsList.findIndex(light => light.id === id);
    const newLight: any = {
        ...lightsList[index],
        [property]: value
    };

    if (newLight[property] !== (lightsList as any)[index][property]) {
        const newLightsList = [...lightsList];
        newLightsList[index] = newLight;
        
        setLightsList(newLightsList);
    }
    }

    /* ASSETS */
    const [assetsList, setAssetsList] = useState([
        {
        id: nanoid(5),
        name: "pear",
        object: "toBeReplaced",
        position:[0,0,0],
        rotation:[0,0,0],
        scale:[10,10,10],
        ref: null,
        isSelected: false,
        castShadow: true,
        receiveShadow: true,
        visible: true,
        },{
        id: nanoid(5),
        name: "pear",
        object: "toBeReplaced",
        position:[1,0,1],
        rotation:[0,90,0],
        scale:[10,10,10],
        ref: null,
        isSelected: false,
        castShadow: true,
        receiveShadow: true,
        visible: true,
        }
    ]);

    // replace with updateAssetById => no point in separating properties when it's just creating new asset later on
    const updateAssetProperty = (id: string, property: keyof Asset, value: any) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        const newAsset: Asset = {
            ...assetsList[index],
            [property]: value
        };

        if (newAsset[property] !== (assetsList as any)[index][property]) {
            const newAssetsList = [...assetsList];
            (newAssetsList[index] as any) = newAsset;

            setAssetsList(newAssetsList);
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
        <SidebarControlsContext.Provider value={{ lightsList, updateLight, assetsList, updateAssetProperty, scene, updateScene }} >
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