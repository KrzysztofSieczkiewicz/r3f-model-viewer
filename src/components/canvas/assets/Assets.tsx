import { useGLTF } from "@react-three/drei";
import React from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { RenderedAsset } from "./RenderedAsset";

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

useGLTF.preload("models/pear/Pear2_LOD0.gltf");