import React from "react";
import { useState } from "react";
import assetStyles from './Assets.module.css'
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { AssetItem } from "./AssetItem";
import { AssetWrapper } from "../../../models/Asset";
import { MenuSection } from "../commons/MenuSection";
import { SidebarMenu } from "../commons/SidebarMenu";


export const AssetsMenu = () => {
    const { assetsList, addAsset } = useSceneObjectsContext();
   
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
                <button className={assetStyles.addButton} onClick={() => {addAsset()}}> ADD NEW </button>
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