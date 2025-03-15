import React from "react";

import { AmbientLightControls } from "./AmbientLightControls";
import { Submenu } from "../../../features/sideMenu/components/common/submenu/Submenu";
import { SubmenuSection } from "../../../features/sideMenu/components/common/submenu/SubmenuSection";

export const SceneMenu = () => {
    
    return (
        <Submenu>
            <SubmenuSection title="Ambient light">
                <AmbientLightControls />
            </SubmenuSection>
        </Submenu>
    );
}