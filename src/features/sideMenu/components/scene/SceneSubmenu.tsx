import React from "react";

import { SceneControlsAmbientLighting } from "./SceneControlsAmbientLighting";
import { SubmenuSection } from "../common/submenus/SubmenuSection";

type Props = {
    active: boolean;
}

export const SceneSubmenu = ( {active}: Props) => {
    
    if (!active) return;
    return (
        <>
            <SubmenuSection title="Ambient light">
                <SceneControlsAmbientLighting />
            </SubmenuSection>
        </>
    );
}