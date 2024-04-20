import React from "react";
import { useState } from "react";
import styles from './Sidebar.module.css';
import './sidebar.css' // TODO: REMOVE THAT AFTER CLEARING PLAIN CSS FROM CHILD COMPONENTS

import { ReactComponent as LightIcon } from './../../icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './../../icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './../../icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './../../icons/sidebar/image.svg';
import { SidebarItem } from "./SidebarItem";
import { AssetsMenu } from "./assets/AssetsMenu";
import { EffectsMenu } from "./effects/EffectsMenu";
import { LightsMenu } from "./lights/LightsMenu";
import { SceneMenu } from "./scene/SceneMenu";


export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<string>("");

    const handleItemClick = (item: string) => {
        if (activeItem === item) {
            setActiveItem("");
        } else {
            setActiveItem(item)
        }
    };

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebarNav}>
                <SidebarItem 
                    icon={<EarthIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Environment"}
                    onClick={() => handleItemClick("Environment")}
                >
                    <SceneMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<CubeIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Objects"}
                    onClick={() => handleItemClick("Objects")}
                >
                    <AssetsMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<LightIcon className={styles.sidebarIcon} />} 
                    active={activeItem === "Lights"}
                    onClick={() => handleItemClick("Lights")}
                >
                    <LightsMenu />
                </SidebarItem>
                <SidebarItem
                    icon={<ImageIcon className={styles.sidebarIcon} />}
                    active={activeItem === "Rendering"}
                    onClick={() => handleItemClick("Rendering")}
                >
                    <EffectsMenu />
                </SidebarItem>
            </ul>
        </nav>
    );
}