import React from "react";
import { RenderedAsset } from "./RenderedAsset";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

export const Assets = () => {
    const { assetsList } = useSceneObjectsContext();
        
    return (
        assetsList.map((asset) => {
            return (
                <RenderedAsset 
                    key={asset.id}
                    asset={asset}
                />
            );
        })
    );
}
