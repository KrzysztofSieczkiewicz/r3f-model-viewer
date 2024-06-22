import React from "react";
import { useState } from "react";
import styles from './NewSidebar.module.css';

import { ReactComponent as LightIcon } from './../../icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './../../icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './../../icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './../../icons/sidebar/image.svg';
import { ReactComponent as CameraIcon } from './../../icons/sidebar/camera.svg';
import { SidebarMenuButton } from "./SidebarMenuButton";
import { AssetsMenu } from "./assets/AssetsMenu";
import { EffectsMenu } from "./effects/EffectsMenu";
import { LightsMenu } from "./lights/LightsMenu";
import { SceneMenu } from "./scene/SceneMenu";
import { CamerasMenu } from "./cameras/CamerasMenu";


export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<string>("");

    const handleItemClick = (item: string) => {
        if (activeItem === item) {
            setActiveItem("");
        } else {
            setActiveItem(item)
        }
    };

    // TODO: PRODUCE PROPER SVGs WITH ICONS
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebarNav}>
                <SidebarMenuButton 
                    icon={<EarthIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Environment"}
                    onClick={() => handleItemClick("Environment")} >
                    <SceneMenu />
                </SidebarMenuButton>
                <SidebarMenuButton 
                    icon={<CubeIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Objects"}
                    onClick={() => handleItemClick("Objects")} >
                    <AssetsMenu />
                </SidebarMenuButton>
                <SidebarMenuButton 
                    icon={<LightIcon className={styles.sidebarIcon} />} 
                    active={activeItem === "Lights"}
                    onClick={() => handleItemClick("Lights")} >
                    <LightsMenu />
                </SidebarMenuButton>
                <SidebarMenuButton
                    icon={<ImageIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Effects"}
                    onClick={() => handleItemClick("Effects")} >
                    <EffectsMenu />
                </SidebarMenuButton>
                <SidebarMenuButton
                    icon={<CameraIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Cameras"}
                    onClick={() => handleItemClick("Cameras")} >
                    <CamerasMenu />
                </SidebarMenuButton>
            </ul>
        </nav>
    );
}