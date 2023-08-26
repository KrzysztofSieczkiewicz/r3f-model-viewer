import { useContext, useState } from "react";
import SidebarControlsContext from '../../sidebar/SidebarControlsContext'

import { AssetItem } from "./AssetItem";


//TODO: THIS AND LightsMenu.js can be merged into common class by just providing assets- or lightsList as prop an just iterating through
export function AssetsMenu() {
    const { assetsList } = useContext(SidebarControlsContext);
   
    const [activeItem, setActiveItem] = useState();

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item)
        }
    };
    
    return (
        <div className="dropdown">
            {assetsList.map((asset) => {
                return (
                    <AssetItem
                        asset={asset} 
                        key={asset.id}
                        active={activeItem === asset.id}
                        onClick={() => handleItemClick(asset.id)}
                    />
                );
            })}
        </div>
    );
}