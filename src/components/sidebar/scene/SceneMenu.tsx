import { useContext } from "react";
import { ColorPicker } from "../commonComponents/ColorPicker";

import { useSidebarControlsContext } from '../SidebarControlsContext'   
import { Slider } from "../commonComponents/Slider";
import React from "react";

export const SceneMenu = () => {
    const { scene, updateScene } = useSidebarControlsContext();

    // Todo: for ambientLight color picker add option to match the light to the background
    
    return (
        <div className="dropdown">
            <section className="scene-section dropdown-item">
                <h3 className="scene-section-header">Background</h3>
                <ColorPicker name="Color" 
                    currentColor={scene.backgroundColor}
                    handleChange={(val) => updateScene('backgroundColor', val)}
                />
            </section>
            <section className="scene-section dropdown-item">
                <h3 className="scene-section-header">Ambient light</h3>
                <ColorPicker name="Color"
                    currentColor={scene.ambientLight.color}
                    handleChange={(val) => updateScene('ambientLight.color', val)}
                />
                <Slider name="Intensity"
                    value={scene.ambientLight.intensity}
                    handleChange={(val) => updateScene('ambientLight.intensity', val)}
                    min={0} max={3} step={0.001} defaultValue={0.1}
                />
            </section>
        </div>
    );
}