import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { AssetWrapper, INIT_ASSET_LIST } from "../../models/Asset";
import { LightWrapper, INIT_LIGHTS_LIST } from "../../models/Light";

export type EditableWrapper = AssetWrapper | LightWrapper

type SceneObjectsContext = {
    assetsList: AssetWrapper[], 
    updateAsset: (newAsset: AssetWrapper) => void,

    lightsList: LightWrapper[], 
    updateLight: (newLight: LightWrapper) => void,
}

export const SceneObjectsContext = createContext<SceneObjectsContext | null>( null );

export const SceneObjectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);

    const updateLight = useCallback((newLight: LightWrapper) => {
        const index = lightsList.findIndex(asset => asset.id === newLight.id);

        const newLightsList = [...lightsList];
        newLightsList[index] = newLight;

        setLightsList(newLightsList);
    }, []);

    const updateAsset = useCallback((newAsset: AssetWrapper) => {
        const index = assetsList.findIndex(asset => asset.id === newAsset.id);

        const newAssetsList = [...assetsList];
        newAssetsList[index] = newAsset;

        setAssetsList(newAssetsList);
    }, []);

    return (
        <SceneObjectsContext.Provider value={{ lightsList, updateLight, assetsList, updateAsset }} >
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