import React, { useCallback, useContext, useMemo } from "react";
import { ReactNode, createContext, useState } from "react";

import { AssetProperties, AssetWrapper, getDefaultAsset, Meshes, UnwrappedAssetWrapper, getDefaultUnwrappedAsset, initializeAssetList } from "../../../models/assets/Asset";
import { LightWrapper, INIT_LIGHTS_LIST, LightProperties, LightType, getDefaultLight } from "../../../models/Light";
import { DEFAULT_MESH_BOX, DEFAULT_MESH_CONE, DEFAULT_MESH_SPHERE, PrimitiveProperties, Primitives, PrimitiveWrapper } from "../../../models/assets/meshes/Primitive";
import { CAMERA_TYPES, CameraProperties, CameraType, CameraWrapper, DEFAULT_ORTOGRAPHIC_CAMERA, DEFAULT_PERSPECTIVE_CAMERA, INIT_CAMERAS_LIST } from "../../../models/Camera";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterialProperties, EditableMaterials, EditableMaterialWrapper } from "../../../models/assets/materials/EditableMaterial";

export type EditableWrapper = AssetWrapper | LightWrapper

type SceneObjectsContextProps = {
    assetsList: AssetWrapper[],
    getAsset: (id: string) => AssetWrapper,
    updateAssetProperties: (id: string, change: Partial<AssetProperties>) => void,
    updatePrimitiveProperties: (id: string, change: Partial<PrimitiveProperties>) => void,
    updateAssetMaterialProperties: (id: string, change: Partial<EditableMaterialProperties>) => void,
    changeEditableMaterialType: (id: string, newType: EditableMaterials) => void,
    deleteAsset: (id: string) => void,
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

export const SceneObjectsContext = createContext<SceneObjectsContextProps | null>(null);

export const SceneObjectsContextProvider = (props: {children: ReactNode}): JSX.Element => {

    const [ assetsRecord, setAssetsRecord ] = useState<Record<string, AssetWrapper>>(initializeAssetList());
    const [ lightsList, setLightsList ] = useState<LightWrapper[]>(INIT_LIGHTS_LIST);
    const [ camerasList, setCamerasList ] = useState<CameraWrapper[]>(INIT_CAMERAS_LIST)


    /* ASSETS */

    const assetsList = useMemo(() => {
        return Object.values(assetsRecord);
    }, [assetsRecord]);

    const getAsset = useCallback( (id: string) => {
        return assetsRecord[id];
    }, [assetsRecord])

    const addAssetPrimitive = useCallback( (type: Primitives) => {
        let primitive;
        switch(type) {
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

        setAssetsRecord( assetsRecord => {
            return {
                ...assetsRecord,
                [newAsset.id]: newAsset
            }
        })
    }, []);

    const addAssetUnwrapped = useCallback( (change?: Partial<UnwrappedAssetWrapper>) => {
        let newAsset = getDefaultUnwrappedAsset();

        if(change) {
            newAsset = { ...newAsset, ...change }
        }

        setAssetsRecord( assetsRecord => {
            return {
                ...assetsRecord,
                [newAsset.id]: newAsset
            }
        });
    }, []);

    const updateAssetProperties = useCallback( (id: string, change: Partial<AssetProperties>) => {
        setAssetsRecord( assetsRecord => {
            const assetToUpdate = assetsRecord[id]
            if (!assetToUpdate) return assetsRecord;

            const newAssetProperties = {
                ...assetToUpdate.properties,
                ...change
            };

            const updatedAsset = {
                ...assetToUpdate,
                properties: newAssetProperties
            };

            return {
                ...assetsRecord,
                [id]: updatedAsset
            }
        });
    }, []);

    const updatePrimitiveProperties = useCallback( (id: string, change: Partial<PrimitiveProperties>) => {
        setAssetsRecord( assetsRecord => {
            const initialAsset = assetsRecord[id]
            if (!initialAsset) return assetsRecord;

            const initialMesh = initialAsset.mesh as PrimitiveWrapper;

            const updatedAsset = {
                ...initialAsset,
                mesh: {
                    ...initialMesh,
                    properties: {
                        ...initialMesh.properties,
                        ...change
                    }
                }
            } as AssetWrapper

            return {
                ...assetsRecord,
                [id]: updatedAsset
            };
        });
    }, []);

    const updateAssetMaterialProperties = useCallback( (id: string, change: Partial<EditableMaterialProperties>) => {
        setAssetsRecord( assetsRecord => {
            const initialAsset = assetsRecord[id]
            if (!initialAsset) return assetsRecord;

            const initialMaterial = initialAsset.material as EditableMaterialWrapper;

            const updatedAsset = {
                ...initialAsset,
                material: {
                    ...initialMaterial,
                    properties: {
                        ...initialMaterial.properties,
                        ...change
                    }
                }
            } as AssetWrapper

            return {
                ...assetsRecord,
                [id]: updatedAsset
            }
        });
    }, []);

    const changeEditableMaterialType = useCallback( (id: string, newType: EditableMaterials) => {
        setAssetsRecord( assetsRecord => {
            const initialAsset = assetsRecord[id]
            if (!initialAsset) return assetsRecord;

            const initialMaterialProperties = initialAsset.material.properties;
            const newMaterialProperties = DEFAULT_EDITABLE_MATERIALS[newType].properties;

            const updatedAsset = {
                ...assetsRecord[id],
                material: {
                    type: newType,
                    properties: {
                        ...initialMaterialProperties,
                        ...newMaterialProperties
                    }
                }
            } as AssetWrapper

            return {
                ...assetsRecord,
                [id]: updatedAsset
            }
        });
    }, []);

    const deleteAsset = useCallback( (id: string) => {
        setAssetsRecord( assetsRecord => {
            const { [id]: _, ...newAssetsRecord } = assetsRecord;
            return newAssetsRecord;
        });
    }, []);


    /* LIGHTS */

    const addDefaultLight = useCallback((type: LightType) => {
        const newLight = getDefaultLight(type);
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
            assetsList, getAsset, updateAssetProperties, updatePrimitiveProperties, updateAssetMaterialProperties, changeEditableMaterialType, deleteAsset, addAssetPrimitive, addAssetUnwrapped,
            lightsList, changeLightType, updateLightProperties, deleteLight, addDefaultLight, 
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