import { useGLTF } from "@react-three/drei";
import React from "react";
import { AssetWrapper } from "../models/Asset";
import { RenderedAsset } from "./RenderedAsset";

type Props = {
    assetsList: AssetWrapper[]
}

export const Assets = ({ assetsList }: Props) => {
        
    return (
        assetsList.map((asset) => {
            if(asset.visible) {
                return (
                    <RenderedAsset 
                        asset={asset} 
                        key={asset.id} 
                    />
                );
            }
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");