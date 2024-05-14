import React from "react";
import { useState } from "react";
import styles from './../Sidebar.module.css'

import { AssetItem } from "./AssetItem";
import { AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

export const AssetsMenu = () => {
    const { assetsList, updateAsset } = useSceneObjectsContext();
   
    const [activeId, setActiveId] = useState("");

    const handleMenuItemClick = (id: string) => {
        if (activeId === id) {
            setActiveId("");
        } else {
            setActiveId(id);
        }
    };
    
    return (
        <div className={styles.menu}>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Add/Remove</h3>
                <p> this section should contain methods to add new assets</p>
            </section>
            <section className={styles.menuSection}>
                <h3 className={styles.sectionHeader}>Assets</h3>

                {assetsList.map((asset: AssetWrapper) => {
                    return (
                        <AssetItem
                            asset={asset} 
                            key={asset.id}
                            active={activeId === asset.id}
                            onClick={() => handleMenuItemClick(asset.id)}
                            updateAsset={(newAsset:AssetWrapper) => updateAsset(newAsset)}
                        />
                    );
                })}

            </section>
        </div>
    );
}