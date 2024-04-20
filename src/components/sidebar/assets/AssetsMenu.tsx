import React from "react";
import { useState } from "react";
import styles from './Assets.module.css'
import { useSidebarControlsContext } from '../SidebarControlsContext'

import { AssetItem } from "./AssetItem";
import { AssetWrapper } from "../../../models/Asset";


export const AssetsMenu = () => {
    const { assetsList } = useSidebarControlsContext();
   
    const [activeId, setActiveId] = useState("");

    const handleItemClick = (id: string) => {
        if (activeId === id) {
            setActiveId("");
        } else {
            setActiveId(id)
        }
    };
    
    return (
        <div className={styles.menu}>
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Add/Remove</h3>
                <p> this section should contain methods to add new assets</p>
            </section>
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Assets</h3>

                {assetsList.map((asset: AssetWrapper) => {
                    return (
                        <AssetItem
                            asset={asset} 
                            key={asset.id}
                            active={activeId === asset.id}
                            onClick={() => handleItemClick(asset.id)}
                        />
                    );
                })}

            </section>
        </div>
    );
}