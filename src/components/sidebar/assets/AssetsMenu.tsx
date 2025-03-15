import React from "react";
import { useState } from "react";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { AssetItem } from "./AssetItem";
import { AssetWrapper } from "../../../models/assets/Asset";
import { AddAssetButton } from "./AddAssetButton";
import { Submenu } from "../../../features/sideMenu/components/common/submenu/Submenu";
import { SubmenuSection } from "../../../features/sideMenu/components/common/submenu/SubmenuSection";


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
        <Submenu>
            <SubmenuSection>
                <AddAssetButton />
            </SubmenuSection>

            <SubmenuSection title="Assets">
                {assetsList.map((asset: AssetWrapper) => {
                    return <AssetItem
                        key={asset.id}
                        isActive={activeId === asset.id}
                        asset={asset}
                        toggleExtend={() => toggleItemExtend(asset.id)}
                    />
                })}
            </SubmenuSection>
        </Submenu>
    );
}