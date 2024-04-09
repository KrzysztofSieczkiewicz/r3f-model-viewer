import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";
import { AssetWrapper } from "../models/Asset";
import { RenderedAsset } from "./RenderedAsset";
import { useSidebarControlsContext } from "../components/sidebar/SidebarControlsContext";

type Props = {
    assetsList: AssetWrapper[]
}

export const Assets = ({ assetsList }: Props) => {
    const { selectedList } = useSidebarControlsContext();
        
    return (
        assetsList.map((asset) => {
            if(asset.visible) {
                return (
                    <RenderedAsset 
                        key={asset.id}
                        asset={asset}
                        isSelected={selectedList.includes(asset.id)}
                    />
                );
            }
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");