import React from "react";
import { useState } from "react";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";

import { AssetWrapper } from "../../../../models/assets/Asset";
import { ButtonAddAsset } from "./ButtonAddAsset";
import { SubmenuSection } from "../common/submenus/SubmenuSection";
import { ListedAsset } from "./ListedAsset";
import { Submenu } from "../common/submenus/Submenu";

type Props = {
    active: boolean;
}

export const AssetsSubmenu = ({active}: Props) => {
    const { assetsList } = useSceneObjectsContext();
   
    const [activeAssetId, setActiveAssetId] = useState("");

    // TODO: MOVE THIS TO UTILS OR HOOKS -> THE SAME IS USED IN EVERY MENU
    const toggleItemExtend = (id: string) => {
        if (activeAssetId === id) {
            setActiveAssetId("");
        } else {
            setActiveAssetId(id);
        }
    };

    return (
        <Submenu active={active}>
            <SubmenuSection>
                <ButtonAddAsset />
            </SubmenuSection>

            <SubmenuSection title="Assets">
                {assetsList.map((asset: AssetWrapper) => {
                    return <ListedAsset
                        key={asset.id}
                        isActive={activeAssetId === asset.id}
                        asset={asset}
                        toggleExtend={() => toggleItemExtend(asset.id)}
                    />
                })}
            </SubmenuSection>
        </Submenu>
    );
}