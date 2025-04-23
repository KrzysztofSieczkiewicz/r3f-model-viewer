import React from "react";
import { useState } from "react";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";

import { AssetWrapper } from "../../../../models/assets/Asset";
import { ButtonAddAsset } from "./ButtonAddAsset";
import { Submenu } from "../common/submenus/Submenu";
import { SubmenuSection } from "../common/submenus/SubmenuSection";
import { ListedAsset } from "./ListedAsset";


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
                <ButtonAddAsset />
            </SubmenuSection>

            <SubmenuSection title="Assets">
                {assetsList.map((asset: AssetWrapper) => {
                    return <ListedAsset
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