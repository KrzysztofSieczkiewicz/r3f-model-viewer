import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { AssetWrapper, INIT_ASSET_LIST, defaultAsset } from "../../models/Asset";
import { LightWrapper, INIT_LIGHTS_LIST, defaultLight } from "../../models/Light";

export type EditableWrapper = AssetWrapper | LightWrapper

type SceneObjectsContext = {
    assetsList: AssetWrapper[], 
    updateAsset: (id: string, change: Partial<AssetWrapper>) => void,
    deleteAsset: (id: string) => void,
    addAsset: () => void,

    lightsList: LightWrapper[], 
    updateLight: (id: string, change: Partial<LightWrapper>) => void,
    deleteLight: (id: string) => void,
    addLight: () => void,
}

export const SceneObjectsContext = createContext<SceneObjectsContext | null>( null );

export const SceneObjectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);


    const updateLight = useCallback((id: string, change: Partial<LightWrapper>) => {
        const index = lightsList.findIndex(light => light.id === id);
        if (index === -1) return;

        const updatedLight = { ...lightsList[index], ...change };
        const newLightsList = lightsList.map( (light, i) => i===index ? updatedLight : light);
        
        setLightsList(newLightsList);
    }, [lightsList]);

    const deleteLight = useCallback((id: string) => {
        const filteredLights = lightsList.filter( (asset) => asset.id !== id );
        setLightsList(filteredLights);
    }, [lightsList]);

    const addLight = useCallback(() => {
        const extendedLights = [...lightsList, defaultLight] as LightWrapper[];
        setLightsList(extendedLights);
    }, [lightsList]);


    const updateAsset = useCallback((id: string, change: Partial<AssetWrapper>) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        if (index === -1) return;

        const updatedAsset = { ...assetsList[index], ...change };
        const newAssetsList = assetsList.map( (asset, i) => i===index ? updatedAsset: asset);
        
        setAssetsList(newAssetsList);
    }, [assetsList]);

    const deleteAsset = (id: string) => {
        const filteredAssets = assetsList.filter( (asset) => asset.id !== id );
        setAssetsList(filteredAssets);
    };

    // TODO: REPLACE "defaultAsset" WITH PROPER ASSET IMPORT LOGIC 
    // (ESP WITH CREATING NEW ID EACH TIME)
    const addAsset = () => {
        const extendedAssetsList = [...assetsList, defaultAsset] as AssetWrapper[];
        setAssetsList(extendedAssetsList);
    };


    return (
        <SceneObjectsContext.Provider value={{ lightsList, updateLight, deleteLight, addLight, assetsList, updateAsset, deleteAsset, addAsset }} >
            {props.children}
        </SceneObjectsContext.Provider>
    );
}

export const useSceneObjectsContext = (): SceneObjectsContext => {
    const context = useContext(SceneObjectsContext);

    if (context === null) {
        throw new Error("useSceneObjectsContext must be used within a SidebarControlsContextProvider")
    }

    return context;
}