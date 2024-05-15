import React from "react";
import { useState } from "react";
import styles from './../Sidebar.module.css'
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";

import { AssetItem } from "./AssetItem";
import { AssetWrapper } from "../../../models/Asset";


export const AssetsMenu = () => {
    const { assetsList, updateAsset, deleteAsset } = useSceneObjectsContext();
   
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
                            key={asset.id}
                            isActive={activeId === asset.id}
                            isVisible={asset.visible}
                            name={asset.name}
                            position={asset.position}
                            rotation={asset.rotation}
                            scale={asset.scale}

                            onClick={() => handleMenuItemClick(asset.id)}
                            updateAsset={(change: Partial<AssetWrapper>) => updateAsset(asset.id, change)}
                            deleteAsset={() => deleteAsset(asset.id)}
                        />
                    );
                })}

            </section>
        </div>
    );
}