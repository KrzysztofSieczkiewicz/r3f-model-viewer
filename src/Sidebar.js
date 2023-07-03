import { SidebarItem } from "./SidebarItem";
import { ReactComponent as LightIcon } from './icons/sidebar/light.svg';
import { ReactComponent as CubeIcon } from './icons/sidebar/cube.svg';
import { ReactComponent as EarthIcon } from './icons/sidebar/earth.svg';
import { ReactComponent as ImageIcon } from './icons/sidebar/image.svg';
import { LightsMenu } from "./components/sidebar/lights/LightsMenu";
import { useState } from "react";
import './components/sidebar/sidebar.css';
import { AssetsMenu } from "./components/sidebar/assets/AssetsMenu";

export function Sidebar() {
    const [activeItem, setActiveItem] = useState();

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item)
        }
    };

    return (
        <nav className="sidebar">
            <p>TEST</p>
            <ul className="sidebar-nav">
                <SidebarItem 
                    icon={<EarthIcon />}
                    active={activeItem === "Environment"}
                    onClick={() => handleItemClick("Environment")}
                />
                <SidebarItem 
                    icon={<CubeIcon />}
                    active={activeItem === "Objects"}
                    onClick={() => handleItemClick("Objects")}
                >
                    <AssetsMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<LightIcon />} 
                    active={activeItem === "Lights"}
                    onClick={() => handleItemClick("Lights")}
                >
                    <LightsMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<ImageIcon />}
                    active={activeItem === "Rendering"}
                    onClick={() => handleItemClick("Rendering")}
                />
            </ul>
        </nav>
    );
}