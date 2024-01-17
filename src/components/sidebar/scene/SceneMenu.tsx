import { useContext } from "react";
import { ColorPicker } from "../controls/ColorPicker";
import { SidebarControlsContext } from "../SidebarControlsContext";
import Slider from "../controls/Slider";

export function SceneMenu() {
    const { scene, setScene } = useContext(SidebarControlsContext);

    // Todo: for ambientLight color picker add option to match the light to the background

    return (
        <div className="dropdown">
            <section className="scene-section dropdown-item">
                <h3 className="scene-section-header">Background</h3>
                <ColorPicker name="Color" 
                    value={scene.backgroundColor}
                    handleChange={(val) => setScene({...scene, backgroundColor: val}) }
                />
            </section>
            <section className="scene-section dropdown-item">
                <h3 className="scene-section-header">Ambient light</h3>
                <ColorPicker name="Color"
                    value={scene.ambientLight.color}
                    handleChange={(val) => setScene({...scene, ambientLight:{...scene.ambientLight, color: val} }) }
                />
                <Slider name="Intensity"
                    value={scene.ambientLight.intensity}
                    handleChange={(val) => setScene({...scene, ambientLight:{...scene.ambientLight, intensity: val} }) }
                    min={0} max={3} step={0.001} defaultValue={0.1}
                />
            </section>
        </div>
    );
}