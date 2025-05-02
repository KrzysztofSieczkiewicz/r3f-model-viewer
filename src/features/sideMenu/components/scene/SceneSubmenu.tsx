import React from "react";

import { SceneControlsAmbientLighting } from "./SceneControlsAmbientLighting";
import { SubmenuSection } from "../common/submenus/SubmenuSection";
import { Submenu } from "../common/submenus/Submenu";

type Props = {
    active: boolean;
}

export const SceneSubmenu = ( {active}: Props) => {
    
    return (
        <Submenu active={active}>
            <SubmenuSection title="Ambient light">
                <SceneControlsAmbientLighting />
            </SubmenuSection>
        </Submenu>
    );
}