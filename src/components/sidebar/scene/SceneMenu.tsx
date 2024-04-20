import { ColorPicker } from "../common/ColorPicker";

import { useSidebarControlsContext } from '../SidebarControlsContext'   
import { Slider } from "../common/Slider";
import React from "react";

export const SceneMenu = () => {
    const { scene, updateScene } = useSidebarControlsContext();
    
    return (
        <div className="dropdown">
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Background</h3>
                <ColorPicker name="Color" 
                    currentColor={scene.backgroundColor}
                    handleChange={(val) => updateScene('backgroundColor', val)}
                />
            </section>
            <section className="dropdown-section dropdown-item">
                <h3 className="section-header">Ambient light</h3>
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