import { useGLTF } from "@react-three/drei";
import React from "react";
import { RenderedAsset } from "./RenderedAsset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { AssetWrapper } from "../../../models/Asset";
import { useSceneValue } from "../../contexts/SceneContext";

export const Assets = () => {
    const { assetsList, updateAsset } = useSceneObjectsContext();
    const [ selectedObjectId, setScene ] = useSceneValue((scene)=> scene["selectedObjectId"]);
        
    return (
        assetsList.map((asset) => {
            if(!asset.visible) return <></>;
            return (
                <RenderedAsset 
                    key={asset.id}
                    asset={asset}
                    updateAsset={(change: Partial<AssetWrapper>) => updateAsset(asset.id, change)}
                />
            );
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");