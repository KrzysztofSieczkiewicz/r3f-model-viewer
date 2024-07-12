import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { AssetProperties, AssetWrapper, INIT_ASSET_LIST, DEFAULT_ASSET, Assets } from "../../models/Asset";
import { LightWrapper, INIT_LIGHTS_LIST, LightProperties, LightTypes, LIGHT_TYPES, DEFAULT_POINTLIGHT, DEFAULT_SPOTLIGHT } from "../../models/Light";
import { DEFAULT_MESH_CONE, DEFAULT_MESH_SPHERE, PrimitiveProperties, Primitives } from "../../models/Primitive";

export type EditableWrapper = AssetWrapper | LightWrapper

type SceneObjectsContext = {
    assetsList: AssetWrapper[], 
    updateAssetProperties: (id: string, change: Partial<AssetProperties>) => void,
    updatePrimitiveProperties: (id: string, change: Partial<PrimitiveProperties>) => void,
    deleteAsset: (id: string) => void,
    addAsset: () => void,
    addAssetPrimitive: (primitiveType: Primitives) => void,

    lightsList: LightWrapper[],
    changeLightType: (id: string, type: LightTypes) => void,
    updateLightProperties: (id: string, change: Partial<LightProperties>) => void,
    deleteLight: (id: string) => void,
    addLight: (light: LightWrapper) => void,
}

export const SceneObjectsContext = createContext<SceneObjectsContext | null>( null );

export const SceneObjectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);

    const addLight = useCallback((light: LightWrapper) => {
        const extendedLights = [...lightsList, light] as LightWrapper[];
        setLightsList(extendedLights);
    }, [lightsList]);

    const changeLightType = useCallback((id: string, type: LightTypes) => {
        const index = lightsList.findIndex(light => light.id === id);
        if (index === -1) return;

        let defaultProps;
        switch(type) {
            case LIGHT_TYPES.pointLight:
                defaultProps = DEFAULT_POINTLIGHT.properties;
                break;
            case LIGHT_TYPES.spotLight:
                defaultProps = DEFAULT_SPOTLIGHT.properties;
                break;
        }

        const newLight = { ...lightsList[index], type: type } as LightWrapper;
        newLight.properties = { ...defaultProps, ...lightsList[index].properties }

        const newLightsList = lightsList.map( (light, i) => i===index ? newLight : light);
        setLightsList(newLightsList);

    }, [lightsList]);

    const updateLightProperties = useCallback((id: string, change: Partial<LightProperties>) => {
        const index = lightsList.findIndex(light => light.id === id);
        if (index === -1) return;

        const newLight = { ...lightsList[index] };
        newLight.properties = { ...lightsList[index].properties, ...change }

        const newLightsList = lightsList.map( (light, i) => i===index ? newLight : light);
        setLightsList(newLightsList);
    }, [lightsList]);

    const deleteLight = useCallback((id: string) => {
        const index = lightsList.findIndex(light => light.id === id);
        if (index === -1) return;

        const filteredLights = lightsList.filter( (light) => light.id !== id );
        setLightsList(filteredLights);
    }, [lightsList]);

    


    // TODO: REPLACE "defaultAsset" WITH PROPER ASSET IMPORT LOGIC 
    // (ESP WITH CREATING NEW ID EACH TIME)
    const addAsset = () => {
        const extendedAssetsList = [...assetsList, DEFAULT_ASSET] as AssetWrapper[];
        setAssetsList(extendedAssetsList);
    };

    const addAssetPrimitive = (primitiveType: Primitives) => {
        let primitive;
        switch(primitiveType) {
            case Primitives.Sphere:
                primitive = DEFAULT_MESH_SPHERE;
                break;
            case Primitives.Cone:
                primitive = DEFAULT_MESH_CONE;
                break;
        }
        const newAsset = {...DEFAULT_ASSET, type: Assets.Primitive, mesh: primitive};
        const extendedAssetsList = [...assetsList, newAsset];

        setAssetsList(extendedAssetsList);
    }

    const updateAssetProperties = useCallback((id: string, change: Partial<AssetProperties>) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        if (index === -1) return;

        const updatedAsset = {
            ...assetsList[index],
            properties: {
                ...assetsList[index].properties,
                ...change
            }
        };
        const newAssetsList = assetsList.map( (asset, i) => i===index ? updatedAsset: asset);
        setAssetsList(newAssetsList);
    }, [assetsList]);

    const updatePrimitiveProperties = useCallback((id: string, change: Partial<PrimitiveProperties>) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        if (index === -1) return;

        const updatedAsset = {
            ...assetsList[index],
            mesh: {
                ...assetsList[index].mesh,
                properties: {
                    ...assetsList[index].mesh.properties,
                    ...change
                }
            }
        } as AssetWrapper;
        const newAssetsList = assetsList.map( (asset, i) => i===index ? updatedAsset: asset);
        setAssetsList(newAssetsList);
    }, [assetsList]);

    const deleteAsset = (id: string) => {
        const filteredAssets = assetsList.filter( (asset) => asset.id !== id );
        setAssetsList(filteredAssets);
    };

    
    return (
        <SceneObjectsContext.Provider value={{ 
            lightsList, changeLightType, updateLightProperties, deleteLight, addLight, 
            assetsList, updateAssetProperties, updatePrimitiveProperties, deleteAsset, addAsset, addAssetPrimitive }} >
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