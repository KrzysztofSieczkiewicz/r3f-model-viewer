import React from "react";
import { useState } from "react";
import styles from './NewSidebar.module.css';

import { SidebarMenuButton } from "./SidebarMenuButton";
import { AssetsMenu } from "./assets/AssetsMenu";
import { EffectsMenu } from "./effects/EffectsMenu";
import { LightsMenu } from "./lights/LightsMenu";
import { SceneMenu } from "./scene/SceneMenu";
import { CamerasMenu } from "./cameras/CamerasMenu";

export enum MenuTypes {
    None,
    Environment,
    Objects,
    Lights,
    Effects,
    Cameras,
}


export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<MenuTypes>(MenuTypes.None);

    const handleItemClick = (item: MenuTypes) => {
        if (activeItem === item) {
            setActiveItem(MenuTypes.None);
        } else {
            setActiveItem(item)
        }
    };

    // TODO: PRODUCE PROPER SVGs WITH ICONS
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebarNav}>
                <SidebarMenuButton
                    type={MenuTypes.Environment}
                    active={activeItem === MenuTypes.Environment}
                    onClick={() => handleItemClick(MenuTypes.Environment)} >
                    <SceneMenu />
                </SidebarMenuButton>
                <SidebarMenuButton
                    type={MenuTypes.Objects}
                    active={activeItem === MenuTypes.Objects}
                    onClick={() => handleItemClick(MenuTypes.Objects)} >
                    <AssetsMenu />
                </SidebarMenuButton>
                <SidebarMenuButton 
                    type={MenuTypes.Lights}
                    active={activeItem === MenuTypes.Lights}
                    onClick={() => handleItemClick(MenuTypes.Lights)} >
                    <LightsMenu />
                </SidebarMenuButton>
                <SidebarMenuButton
                    type={MenuTypes.Effects}
                    active={activeItem === MenuTypes.Effects}
                    onClick={() => handleItemClick(MenuTypes.Effects)} >
                    <EffectsMenu />
                </SidebarMenuButton>
                <SidebarMenuButton
                    type={MenuTypes.Cameras}
                    active={activeItem === MenuTypes.Cameras}
                    onClick={() => handleItemClick(MenuTypes.Cameras)} >
                    <CamerasMenu />
                </SidebarMenuButton>
            </ul>
        </nav>
    );
}