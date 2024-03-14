import { useContext, useState } from "react";
import { useSidebarControlsContext } from '../SidebarControlsContext'

import { AssetItem } from "./AssetItem";
import React from "react";
import { AssetWrapper } from "../../../models/Asset";

//TODO: THIS AND LightsMenu.js can be merged into common class by just providing assets- or lightsList as prop an just iterating through
export const AssetsMenu = () => {
    const { assetsList } = useSidebarControlsContext();
   
    const [activeId, setActiveId] = useState<string>("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveId("");
        } else {
            setActiveId(id)
        }
    };
    
    return (
        <div className="dropdown">
            {assetsList.map((asset: AssetWrapper) => {
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