import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { AssetWrapper, INIT_ASSET_LIST } from "../../models/Asset";
import { LightWrapper, INIT_LIGHTS_LIST } from "../../models/Light";

export type EditableWrapper = AssetWrapper | LightWrapper

type SceneObjectsContext = {
    assetsList: AssetWrapper[], 
    updateAsset: (id: string, change: Partial<AssetWrapper>) => void,
    deleteAsset: (id: string) => void,

    lightsList: LightWrapper[], 
    updateLight: (newLight: LightWrapper) => void,
}

export const SceneObjectsContext = createContext<SceneObjectsContext | null>( null );

export const SceneObjectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);


    const updateLight = useCallback((newLight: LightWrapper) => {
        const index = lightsList.findIndex(asset => asset.id === newLight.id);

        const newLightsList = lightsList.map((light, i) => i===index ? newLight : light);

        setLightsList(newLightsList);
    }, [lightsList]);


    const updateAsset = useCallback((id: string, change: Partial<AssetWrapper>) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        if (index === -1) return;

        const updatedAsset = { ...assetsList[index], ...change };
        const newAssetsList = assetsList.map( (asset, i) => i===index ? updatedAsset: asset);
        
        setAssetsList(newAssetsList);
    }, [assetsList]);

    
    const deleteAsset = useCallback((id: string) => {

        const filteredAssets = assetsList.filter( (asset) => asset.id !== id );

        setAssetsList(filteredAssets);
    }, [assetsList])


    return (
        <SceneObjectsContext.Provider value={{ lightsList, updateLight, assetsList, updateAsset, deleteAsset }} >
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