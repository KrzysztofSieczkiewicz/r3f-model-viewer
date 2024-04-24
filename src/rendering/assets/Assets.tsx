import { useGLTF } from "@react-three/drei";
import React from "react";
import { RenderedAsset } from "./RenderedAsset";
import { useSidebarControlsContext } from "../../components/sidebar/SidebarControlsContext";

export const Assets = () => {
    const { assetsList, selectedId } = useSidebarControlsContext();
        
    return (
        assetsList.map((asset) => {
            if(asset.visible) {
                return (
                    <RenderedAsset 
                        key={asset.id}
                        asset={asset}
                        isSelected={selectedId === asset.id}
                    />
                );
            } else return null;
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");