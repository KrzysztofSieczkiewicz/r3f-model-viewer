import { useContext, useEffect, useState } from "react";

import { SidebarControlsContext } from "../SidebarControlsContext";
import { StyledDropdown } from "../Sidebar.styles"
import AssetItem from "./AssetItem";

export function AssetsMenu() {
    const { assetsList } = useContext(SidebarControlsContext);
   
    const [activeItemID, setActiveItemID] = useState<string | null>(null);

    //TODO: replace this logic?
    const handleItemClick = (clickedItemID :string) => {
        setActiveItemID( activeItemID === clickedItemID ? null : clickedItemID );
    };

    return (
        <StyledDropdown>
            {assetsList.map((asset) => {
                return (
                    <AssetItem
                        asset={asset} 
                        key={asset.id}
                        active={activeItemID === asset.id}
                        handleItemClick={handleItemClick}
                    />
                );
            })}
        </StyledDropdown>
    );
}