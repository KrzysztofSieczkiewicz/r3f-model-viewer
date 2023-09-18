import { useContext } from "react";
import { ColorPicker } from "../controls/ColorPicker";

import SidebarControlsContext from '../../sidebar/SidebarControlsContext'   
import { Slider } from "../controls/Slider";

export function SceneMenu() {
    const { scene, updateScene } = useContext(SidebarControlsContext);

    const handleItemClick = () => {

    };
    
    return (
        <div className="dropdown">
            <p>
                TEST MESSAGE
            </p>

            <ColorPicker name="Color" 
                value={scene.backgroundColor}
                handleChange={(val) => {
                    updateScene('backgroundColor', val);
                    console.log("I'm changing scene color to: ", val)
                    }
                }
            />

            <ColorPicker name="Ambient light" 
                value={scene.ambientLight.color}
                handleChange={(val) => {
                    updateScene('ambientLight.color', val);
                console.log("I'm changing light color to: ", val)
                }}
            />
            <Slider name="Intensity"
                value={scene.ambientLight.intensity}
                handleChange={(val) => {
                    updateScene('ambientLight.intensity', val);
                    console.log("I'm changing light intensity to: ", val)
                }}
                min={0} max={3} step={0.001} defaultValue={0.2}
            />

        </div>
    );
}