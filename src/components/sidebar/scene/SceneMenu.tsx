import React from "react";
import menuStyles from './../NewSidebar.module.css'

import { useScene } from "../../contexts/SceneContext";
import { MenuSection } from "../commons/MenuSection";
import { AmbientLightControls } from "./AmbientLightControls";

export const SceneMenu = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <div className={menuStyles.menu}>
            <MenuSection title="Ambient light">
                <AmbientLightControls />
            </MenuSection>
        </div>
    );
}