import React, { useCallback, useState } from "react";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { useSelectSceneObject } from "../../../hooks/useSelect";
import { AssetGizmo } from "./AssetGizmo";
import { PrimitiveAsset } from "./PrimitiveAsset";
import { AssetProperties, AssetWrapper, Meshes } from "../../../models/assets/Asset";
import { UnwrappedAsset } from "./UnwrappedAsset";

export const Assets = () => {
    const { assetsList, updateAssetProperties } = useSceneObjectsContext();

    const [ curentHovered, setCurrentHovered ] = useState<string|null>(null)
    const { currentSelected, setSelected} = useSelectSceneObject();

    const memoizedGizmoUpdate = useCallback( (assetID: string, change: Partial<AssetProperties>) => {
    updateAssetProperties(assetID, { ...change });
    }, [updateAssetProperties]);

    const handleAssetType = (asset: AssetWrapper) => {
        switch(asset.meshType) {
            case Meshes.Primitive:
                return <PrimitiveAsset isSelected={currentSelected===asset.id} isHovered={curentHovered===asset.id} assetID={asset.id} />
            case Meshes.Unwrapped:
                return <UnwrappedAsset isSelected={currentSelected===asset.id} isHovered={curentHovered===asset.id} assetID={asset.id} />
        }
    }

    return (
        assetsList.map((asset) => {
            return (
                <group
                    key={asset.id}
                    onPointerOver={()=>setCurrentHovered(asset.id) }
                    onPointerOut={()=>setCurrentHovered(null) }
                    onClick={()=>setSelected(asset.id)} >

                    {asset.id === currentSelected && 
                        <AssetGizmo
                            assetID={asset.id}
                            handleChange={(change) => memoizedGizmoUpdate(asset.id, {...change})} /> 
                    }
                    {handleAssetType(asset)}
                </group>
            );
        })
    );
}
