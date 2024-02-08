
import React, { useState } from 'react';
import SidebarItem from "./components/sidebar/SidebarItem";
import { ReactComponent as LightsIcon } from './icons/sidebar/light.svg';
import { ReactComponent as AssetsIcon } from './icons/sidebar/cube.svg';
import { ReactComponent as EnvironmentIcon } from './icons/sidebar/earth.svg';
//import { ReactComponent as PostProcessingIcon } from './icons/sidebar/image.svg';
import { LightsMenu } from "./components/sidebar/lights/LightsMenu";
import { StyledSidebar, StyledNavList, StyledSidebarMenuIcon } from './components/sidebar/Sidebar.styles';
import { AssetsMenu } from "./components/sidebar/assets/AssetsMenu";
import { SceneMenu } from "./components/sidebar/scene/SceneMenu";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<string>();

    const StyledEnvironmentIcon = () => <StyledSidebarMenuIcon as={EnvironmentIcon} />;
    const StyledAssetsIcon = () => <StyledSidebarMenuIcon as={AssetsIcon} />;
    const StyledLightsIcon = () => <StyledSidebarMenuIcon as={LightsIcon} />;
    //const StyledPostprocessingIcon = () => <StyledSidebarMenuIcon as={PostProcessingIcon} />;

    const handleItemClick = (item: string) => {
        if (activeItem === item) {
            setActiveItem("");
        } else {
            setActiveItem(item)
        }
    };

    return (
        <StyledSidebar>
            <StyledNavList>
                <SidebarItem 
                    icon={<StyledEnvironmentIcon />}
                    active={activeItem === "Environment"}
                    onClick={() => handleItemClick("Environment")}
                >
                    <SceneMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<StyledAssetsIcon />}
                    active={activeItem === "Objects"}
                    onClick={() => handleItemClick("Objects")}
                >
                    <AssetsMenu />
                </SidebarItem>
                <SidebarItem 
                    icon={<StyledLightsIcon />}
                    active={activeItem === "Lights"}
                    onClick={() => handleItemClick("Lights")}
                >
                    <LightsMenu />
                </SidebarItem>
                {/*
                <SidebarItem
                    icon={<ImageIcon className="sidebar-icon" />}
                    active={activeItem === "Rendering"}
                    onClick={() => handleItemClick("Rendering")}
                >
                </SidebarItem>
                */}
            </StyledNavList>
        </StyledSidebar>
    );
}

export default Sidebar;