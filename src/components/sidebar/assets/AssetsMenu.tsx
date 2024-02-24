import { useContext, useState } from "react";
import SidebarControlsContext from '../SidebarControlsContext'

import { AssetItem } from "./AssetItem";
import React from "react";

type Asset = {
    id: string,
    object: string,
    name: string,
    position: number[],
    rotation: number[],
    scale: number[],
    ref: HTMLDivElement | null,
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
    isSelected: boolean,
}

//TODO: THIS AND LightsMenu.js can be merged into common class by just providing assets- or lightsList as prop an just iterating through
export const AssetsMenu = () => {
    const { assetsList } = useContext(SidebarControlsContext);
   
    const [activeId, setActiveId] = useState<string | null>("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveId(null);
        } else {
            setActiveId(id)
        }
    };
    
    return (
        <div className="dropdown">
            {assetsList.map((asset: Asset) => {
                return (
                    <AssetItem
                        asset={asset} 
                        key={asset.id}
                        active={activeId === asset.id}
                        onClick={() => handleItemClick(asset.id)}
                    />
                );
            })}
        </div>
    );
}