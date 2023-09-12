import { useContext } from "react";
import { ColorPicker } from "../controls/ColorPicker";

import SidebarControlsContext from '../../sidebar/SidebarControlsContext'   

export function SceneMenu() {
    const { scene, updateScene } = useContext(SidebarControlsContext);
    const background = scene.background;

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
        </div>
    );
}