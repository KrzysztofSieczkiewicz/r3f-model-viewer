import React, { useState } from "react";
import styles from './Sidebar.module.css';

import { SidebarMenuButton } from "./SidebarMenuButton";
import { AssetsSubmenu } from "../assets/AssetsSubmenu";
import { EffectsSubmenu } from "../effects/EffectsSubmenu";
import { LightsSubenu } from "../lights/LightsSubenu";
import { CamerasSubmenu } from "../cameras/CamerasSubmenu";
import { SceneSubmenu } from "../scene/SceneSubmenu";
import { SideNavbar } from "./SideNavbar";

import { ReactComponent as LightIcon } from './../../../../icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './../../../../icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './../../../../icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './../../../../icons/sidebar/image.svg';
import { ReactComponent as CameraIcon } from './../../../../icons/sidebar/camera.svg';

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
        <div className={styles.sidebar}>
            <SideNavbar>
                <SidebarMenuButton
                    type={MenuTypes.Environment}
                    active={activeItem === MenuTypes.Environment}
                    onClick={() => handleItemClick(MenuTypes.Environment)} >
                        <EarthIcon />
                </SidebarMenuButton>

                <SidebarMenuButton
                    type={MenuTypes.Objects}
                    active={activeItem === MenuTypes.Objects}
                    onClick={() => handleItemClick(MenuTypes.Objects)} >
                        <CubeIcon />
                </SidebarMenuButton>

                <SidebarMenuButton 
                    type={MenuTypes.Lights}
                    active={activeItem === MenuTypes.Lights}
                    onClick={() => handleItemClick(MenuTypes.Lights)} >
                        <LightIcon />
                </SidebarMenuButton>

                <SidebarMenuButton
                    type={MenuTypes.Effects}
                    active={activeItem === MenuTypes.Effects}
                    onClick={() => handleItemClick(MenuTypes.Effects)} >
                        <ImageIcon />
                </SidebarMenuButton>

                <SidebarMenuButton
                    type={MenuTypes.Cameras}
                    active={activeItem === MenuTypes.Cameras}
                    onClick={() => handleItemClick(MenuTypes.Cameras)} >
                        <CameraIcon />
                </SidebarMenuButton>
            </SideNavbar>            

            <>
                <SceneSubmenu active={activeItem === MenuTypes.Environment} />
                <AssetsSubmenu active={activeItem === MenuTypes.Objects} />
                <LightsSubenu active={activeItem === MenuTypes.Lights} />
                <EffectsSubmenu active={activeItem === MenuTypes.Effects} />
                <CamerasSubmenu active={activeItem === MenuTypes.Cameras} />
            </>
        </div>
        
    );
}