import React from "react";
import { useState } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { AssetItem } from "./AssetItem";
import { AssetWrapper } from "../../../models/assets/Asset";
import { MenuSection } from "../commons/MenuSection";
import { SidebarMenu } from "../commons/SidebarMenu";
import { AddAssetButton } from "./AddAssetButton";


export const AssetsMenu = () => {
    const { assetsList } = useSceneObjectsContext();
   
    const [activeId, setActiveId] = useState("");

    // TODO: MOVE THIS TO UTILS OR HOOKS -> THE SAME IS USED IN EVERY MENU
    const toggleItemExtend = (id: string) => {
        if (activeId === id) {
            setActiveId("");
        } else {
            setActiveId(id);
        }
    };
    
    
    return (
        <SidebarMenu>
            <MenuSection>
                <AddAssetButton />
            </MenuSection>

            <MenuSection title="Assets">
                {assetsList.map((asset: AssetWrapper) => {
                    return <AssetItem
                        key={asset.id}
                        isActive={activeId === asset.id}
                        asset={asset}
                        toggleExtend={() => toggleItemExtend(asset.id)}
                    />
                })}
            </MenuSection>
        </SidebarMenu>
    );
}