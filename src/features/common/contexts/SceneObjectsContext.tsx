import React, { useCallback, useContext } from "react";
import { ReactNode, createContext, useState } from "react";

import { AssetProperties, AssetWrapper, INIT_ASSET_LIST, getDefaultAsset, Meshes, UnwrappedAssetWrapper, getDefaultUnwrappedAsset } from "../../../models/assets/Asset";
import { LightWrapper, INIT_LIGHTS_LIST, LightProperties, LightType, getDefaultLight } from "../../../models/Light";
import { DEFAULT_MESH_BOX, DEFAULT_MESH_CONE, DEFAULT_MESH_SPHERE, PrimitiveProperties, Primitives } from "../../../models/assets/meshes/Primitive";
import { CAMERA_TYPES, CameraProperties, CameraType, CameraWrapper, DEFAULT_ORTOGRAPHIC_CAMERA, DEFAULT_PERSPECTIVE_CAMERA, INIT_CAMERAS_LIST } from "../../../models/Camera";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterialProperties, EditableMaterials } from "../../../models/assets/materials/EditableMaterial";

export type EditableWrapper = AssetWrapper | LightWrapper

type SceneObjectsContextProps = {
    assetsList: AssetWrapper[],
    updateAssetProperties: (id: string, change: Partial<AssetProperties>) => void,
    updatePrimitiveProperties: (id: string, change: Partial<PrimitiveProperties>) => void,
    updateEditableMaterialProperties: (id: string, change: Partial<EditableMaterialProperties>) => void,
    changeEditableMaterialType: (id: string, newType: EditableMaterials) => void,
    deleteAsset: (id: string) => void,
    addAsset: () => void,
    addAssetPrimitive: (primitiveType: Primitives) => void,
    addAssetUnwrapped: (change?: Partial<UnwrappedAssetWrapper>) => void,

    lightsList: LightWrapper[],
    changeLightType: (id: string, type: LightType) => void,
    updateLightProperties: (id: string, change: Partial<LightProperties>) => void,
    deleteLight: (id: string) => void,
    addDefaultLight: (type: LightType) => void,

    camerasList: CameraWrapper[],
    addCamera: (type: CameraType) => void,
    updateCameraProperties: (id: string, change: Partial<CameraProperties>) => void,
    deleteCamera: (id: string) => void,
}

export const SceneObjectsContext = createContext<SceneObjectsContextProps | null>( null );

export const SceneObjectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsList, setAssetsList ] = useState<AssetWrapper[]>(INIT_ASSET_LIST);
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);
    const [ camerasList, setCamerasList ] = useState<CameraWrapper[]>(INIT_CAMERAS_LIST)

    const addDefaultLight = useCallback((type: LightType) => {
        const newLight = getDefaultLight(type);
        console.log({newLight})
        const extendedLights = [...lightsList, newLight] as LightWrapper[];
        setLightsList(extendedLights);
    }, [lightsList]);

    const changeLightType = useCallback((id: string, type: LightType) => {
        const index = lightsList.findIndex(light => light.id === id);
        if (index === -1) return;

        let defaultProps = getDefaultLight(type).properties;

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



    const addAsset = () => {
        const extendedAssetsList = [...assetsList, getDefaultAsset()];
        setAssetsList(extendedAssetsList);
    };


    const addAssetPrimitive = useCallback((primitiveType: Primitives) => {
        let primitive;
        switch(primitiveType) {
            case Primitives.Sphere:
                primitive = DEFAULT_MESH_SPHERE;
                break;
            case Primitives.Cone:
                primitive = DEFAULT_MESH_CONE;
                break;
            case Primitives.Box:
                primitive = DEFAULT_MESH_BOX;
                break;
        }
        const newAsset = {...getDefaultAsset(), meshType: Meshes.Primitive, mesh: primitive} as AssetWrapper;
        const extendedAssetsList = [...assetsList, newAsset];

        setAssetsList(extendedAssetsList);
    }, [assetsList]);

    const addAssetUnwrapped = (change?: Partial<UnwrappedAssetWrapper>) => {
        let newAsset = getDefaultUnwrappedAsset();

        if(change) {
            newAsset = { ...newAsset, ...change }
        }
        console.log("New Asset: " ,{newAsset});

        const extendedAssetsList = [...assetsList, getDefaultAsset()];
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

        const initialAsset = assetsList[index];
        if(initialAsset.meshType !== Meshes.Primitive) return;
        
        const initialMesh = initialAsset.mesh;

        const updatedAsset = {
            ...initialAsset,
            mesh: {
                ...initialMesh,
                properties: {
                    ...initialMesh.properties,
                    ...change
                }
            }
        } as AssetWrapper;
        const newAssetsList = assetsList.map( (asset, i) => i===index ? updatedAsset: asset);
        setAssetsList(newAssetsList);
    }, [assetsList]);

    const updateEditableMaterialProperties = useCallback((id: string, change: Partial<EditableMaterialProperties>) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        if (index === -1) return;

        const updatedAsset = {
            ...assetsList[index],
            material: {
                ...assetsList[index].material,
                properties: {
                    ...assetsList[index].material.properties,
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

    const changeEditableMaterialType = useCallback((id: string, newType: EditableMaterials) => {
        const index = assetsList.findIndex(asset => asset.id === id);
        if (index === -1) return;

        const updatedAsset = {
            ...assetsList[index],
            material: {
                type: newType,
                properties: {
                    ...DEFAULT_EDITABLE_MATERIALS[newType].properties,
                    ...assetsList[index].material.properties,
                }
            }
        } as AssetWrapper;

        const newAssetsList = assetsList.map( (asset, i) => i===index ? updatedAsset: asset);
        setAssetsList(newAssetsList);
    }, [assetsList]);



    const addCamera = useCallback((type: CameraType) => {
        const newCamerasList = [...camerasList];
        switch(type) {
            case CAMERA_TYPES.perspectiveCamera:
                newCamerasList.push(DEFAULT_PERSPECTIVE_CAMERA);
                break;
            case CAMERA_TYPES.ortographicCamera:
                newCamerasList.push(DEFAULT_ORTOGRAPHIC_CAMERA);
                break;
        }
        setCamerasList(newCamerasList);
    }, [camerasList]);

    const deleteCamera = useCallback((id: string) => {
        const index = camerasList.findIndex(camera => camera.id === id);
        if (index === -1) return;

        const filteredCameras = camerasList.filter((camera) => camera.id !== id );
        setCamerasList(filteredCameras);
    }, [camerasList]);

    const updateCameraProperties = useCallback((id: string, change: Partial<CameraProperties>) => {
        const index = camerasList.findIndex(light => light.id === id);
        if (index === -1) return;

        const newCamera = { ...camerasList[index] };
        newCamera.properties = { ...camerasList[index].properties, ...change }

        const newCamerasList = camerasList.map( (camera, i) => i===index ? newCamera : camera);
        setCamerasList(newCamerasList);
    }, [camerasList])

    

    
    return (
        <SceneObjectsContext.Provider value={{ 
            lightsList, changeLightType, updateLightProperties, deleteLight, addDefaultLight, 
            assetsList, updateAssetProperties, updatePrimitiveProperties, updateEditableMaterialProperties, changeEditableMaterialType, deleteAsset, addAsset, addAssetPrimitive, addAssetUnwrapped,
            camerasList, addCamera, updateCameraProperties, deleteCamera }} >
            {props.children}
        </SceneObjectsContext.Provider>
    );
}

export const useSceneObjectsContext = (): SceneObjectsContextProps => {
    const context = useContext(SceneObjectsContext);

    if (context === null) {
        throw new Error("useSceneObjectsContext must be used within a SidebarControlsContextProvider")
    }

    return context;
}