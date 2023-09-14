import { useContext } from "react";
import { ColorPicker } from "../controls/ColorPicker";

import SidebarControlsContext from '../../sidebar/SidebarControlsContext'   
import { Slider } from "../controls/Slider";

export function SceneMenu() {
    const { scene, updateScene } = useContext(SidebarControlsContext);
    
    const backgroundColor = scene.backgroundColor;
    console.log(backgroundColor);
    
    const ambientLight = scene.ambientLight;
    console.log("Ambient light: ", ambientLight);

    const color = scene.ambientLight.color;
    console.log("Ambient light color: ", color);

    const intensity = scene.ambientLight.intensity;
    console.log("Ambient light intensity: ", intensity);

    const handleItemClick = () => {

    };
    
    // ADD BACKGROUND ITEM COMPONENT WITH ONLY COLOR PICKER NOW
    // ADD AMBIENT LIGHT COMPONENT WITH COLOR AND INTENSITY CONTROLS
    return (
        <div className="dropdown">
            <p>
                TEST MESSAGE
            </p>

            <ColorPicker name="Color" 
                value={scene.backgroundColor}
                handleChange={(val) => updateScene('backgroundColor', val)}
            />

            <ColorPicker name="Ambient light" 
                value={scene.ambientLight.color}
                handleChange={(val) => updateScene('ambientLight.color', val)}
            />
            <Slider name="Intensity"
                value={scene.backgroundColor.intensity}
                handleChange={(val) => updateScene('ambientLight.intensity', val)}
                min={0} max={3} step={0.005} defaultValue={1}
            />

        </div>
    );
}