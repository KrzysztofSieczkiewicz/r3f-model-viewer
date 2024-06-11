import React from "react";

import { MenuSection } from "../commons/MenuSection";
import { AmbientLightControls } from "./AmbientLightControls";
import { SidebarMenu } from "../commons/SidebarMenu";

export const SceneMenu = () => {
    
    return (
        <SidebarMenu>
            <MenuSection title="Ambient light">
                <AmbientLightControls />
            </MenuSection>
        </SidebarMenu>
    );
}