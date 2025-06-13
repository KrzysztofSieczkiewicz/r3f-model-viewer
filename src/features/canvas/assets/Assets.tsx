import React, { useState } from "react";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { useSelectSceneObject } from "../../../hooks/useSelect";
import { AssetsGizmo } from "./AssetsGizmo";
import { PrimitiveAsset } from "./PrimitiveAsset";

export const Assets = () => {
    const { assetsList, updateAssetProperties } = useSceneObjectsContext();

    const [ curentHovered, setCurrentHovered ] = useState<string|null>(null)
    const { currentSelected, setSelected} = useSelectSceneObject();

    return (
        assetsList.map((asset) => {
            return (
                <group
                    key={asset.id}
                    onPointerOver={()=>setCurrentHovered(asset.id) }
                    onPointerOut={()=>setCurrentHovered(null) }
                    onClick={()=>setSelected(asset.id)} >

                    {/* {asset.id === currentSelected && 
                        <AssetsGizmo
                            assetID={asset.id}
                            handleChange={(change) => updateAssetProperties(asset.id, {...change})} /> 
                    } */}
                    <PrimitiveAsset isSelected={currentSelected===asset.id} isHovered={curentHovered===asset.id} assetID={asset.id} />
                </group>
            );
        })
    );
}
