import { useGLTF } from "@react-three/drei";
import React from "react";
import { RenderedAsset } from "./RenderedAsset";
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

export const Assets = () => {
    const { assetsList } = useSceneObjectsContext();
        
    return (
        assetsList.map((asset) => {
            if(!asset.properties.visible) return <></>;
            return (
                <RenderedAsset 
                    key={asset.id}
                    asset={asset}
                />
            );
        })
    );

}

//useGLTF.preload("models/pear/Pear2_LOD0.gltf");