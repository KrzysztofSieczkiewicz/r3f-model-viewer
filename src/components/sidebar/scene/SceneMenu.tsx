import React from "react";

import { AmbientLightControls } from "./AmbientLightControls";
import { Submenu } from "../../../features/sideMenu/components/common/submenus/Submenu";
import { SubmenuSection } from "../../../features/sideMenu/components/common/submenus/SubmenuSection";

export const SceneMenu = () => {
    
    return (
        <Submenu>
            <SubmenuSection title="Ambient light">
                <AmbientLightControls />
            </SubmenuSection>
        </Submenu>
    );
}