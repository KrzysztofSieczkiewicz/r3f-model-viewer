import React from "react";
import menuStyles from './../NewSidebar.module.css'

import { ColorPicker } from "../common/ColorPicker";
import { Slider } from "../common/Slider";
import { useScene } from "../../contexts/SceneContext";
import { Checkbox } from "../common/Checkbox";
import { MenuSection } from "../commons/MenuSection";

export const SceneMenu = () => {
    const [ scene, setScene ] = useScene();
    
    return (
        <div className={menuStyles.menu}>
            <MenuSection title="Ambient light">
                <Checkbox name={'Active'}
                    value={scene.isAmbientActive}
                    handleChange={(val) => setScene( {isAmbientActive: val} )} />
                <ColorPicker name="Color"
                    currentColor={scene.ambientColor}
                    handleChange={(val) =>  setScene({ambientColor: val}) } />
                <Slider name="Intensity"
                    value={scene.ambientIntensity}
                    handleChange={(val) =>  setScene({ambientIntensity: val}) }
                    min={0} max={3} step={0.001} defaultValue={0.1} />
            </MenuSection>
        </div>
    );
}