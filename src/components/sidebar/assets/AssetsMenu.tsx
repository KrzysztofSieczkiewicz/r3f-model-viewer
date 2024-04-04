import { useState } from "react";
import { useSidebarControlsContext } from '../SidebarControlsContext'

import { AssetItem } from "./AssetItem";
import React from "react";
import { AssetWrapper } from "../../../models/Asset";


export const AssetsMenu = () => {
    const { assetsList } = useSidebarControlsContext();
   
    const [activeId, setActiveId] = useState("");

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