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

    // TODO: PROVIDE A WORKING WAY TO DETERMINE IF OBJECT IS SELECTED
    useEffect(() => {
        console.log(selectedList)
        console.log(selectedList.includes(assetsList[0].id))
    }, [selectedList])
        
    return (
        assetsList.map((asset) => {
            if(asset.visible) {
                return (
                    <RenderedAsset 
                        asset={asset} 
                        key={asset.id} 
                        isSelected={selectedList.includes(asset.id)}
                    />
                );
            }
        })
    );

}

useGLTF.preload("models/pear/Pear2_LOD0.gltf");