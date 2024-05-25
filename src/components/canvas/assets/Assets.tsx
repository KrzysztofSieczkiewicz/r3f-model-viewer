import { useGLTF } from "@react-three/drei";
import React from "react";
import { RenderedAsset } from "./RenderedAsset";
import { useSidebarControlsContext } from "../../contexts/SidebarControlsContext";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { AssetWrapper } from "../../../models/Asset";

export const Assets = () => {
    const { assetsList, updateAsset } = useSceneObjectsContext();
    const { selectedId, updateSelected } = useSidebarControlsContext();
        
    return (
        assetsList.map((asset) => {
            if(!asset.visible) return;
            return (
                <RenderedAsset 
                    key={asset.id}
                    asset={asset}
                    updateAsset={(id: string, change: Partial<AssetWrapper>) => updateAsset(id, change)}
                    isSelected={selectedId === asset.id}
                    updateSelected={(id: string) => updateSelected(id)}
                />
            );
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");