import { SidebarItem } from "./components/sidebar/SidebarItem";
import { ReactComponent as LightIcon } from './icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './icons/sidebar/image.svg';
import { LightsMenu } from "./components/sidebar/lights/LightsMenu";
import { useState } from "react";
import './components/sidebar/sidebar.css';
import { AssetsMenu } from "./components/sidebar/assets/AssetsMenu";
import { SceneMenu } from "./components/sidebar/scene/SceneMenu";
import React from "react";
import { PostProcessingMenu } from "./components/sidebar/postProcessing/PostProcessingMenu";

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
        <nav className="sidebar">
            <ul className="sidebar-nav">
                <SidebarItem 
                    icon={<EarthIcon className="sidebar-icon" />}
                    active={activeItem === "Environment"}
                    onClick={() => handleItemClick("Environment")}
                >
                    <SceneMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<CubeIcon className="sidebar-icon" />}
                    active={activeItem === "Objects"}
                    onClick={() => handleItemClick("Objects")}
                >
                    <AssetsMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<LightIcon className="sidebar-icon" />} 
                    active={activeItem === "Lights"}
                    onClick={() => handleItemClick("Lights")}
                >
                    <LightsMenu />
                </SidebarItem>
                <SidebarItem
                    icon={<ImageIcon className="sidebar-icon" />}
                    active={activeItem === "Rendering"}
                    onClick={() => handleItemClick("Rendering")}
                >
                    <PostProcessingMenu />
                </SidebarItem>
            </ul>
        </nav>
    );
}