import React from "react";

import { SceneControlsAmbientLighting } from "./SceneControlsAmbientLighting";
import { Submenu } from "../common/submenus/Submenu";
import { SubmenuSection } from "../common/submenus/SubmenuSection";

export const SceneSubmenu = () => {
    
    return (
        <Submenu>
            <SubmenuSection title="Ambient light">
                <SceneControlsAmbientLighting />
            </SubmenuSection>
        </Submenu>
    );
}