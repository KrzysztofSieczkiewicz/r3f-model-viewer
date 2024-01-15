import { useContext, useState } from "react";

import { SidebarControlsContext } from "../SidebarControlsContext";
import AssetItem from "./AssetItem";

export function AssetsMenu() {
    const { assetsList } = useContext(SidebarControlsContext);
   
    const [activeItemId, setActiveItem] = useState<string | null>();

    const handleItemClick = (clickedItemId :string) => {
        setActiveItem( 
            activeItemId === clickedItemId ? null : clickedItemId 
            );
    };
    
    return (
        <div className="dropdown">
            {assetsList.map((asset) => {
                return (
                    <AssetItem
                        asset={asset} 
                        key={asset.id}
                        active={activeItemId === asset.id}
                        onClick={() => handleItemClick(asset.id)}
                    />
                );
            })}
        </div>
    );
}