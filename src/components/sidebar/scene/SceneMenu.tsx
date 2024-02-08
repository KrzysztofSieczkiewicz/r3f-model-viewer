import { useContext } from "react";
import { ColorPicker } from "../controls/ColorPicker";
import { SidebarControlsContext } from "../SidebarControlsContext";
import Slider from "../controls/Slider";
import { StyledDropdown, StyledDropdownSection, StyledDropdownSectionHeader } from "../Sidebar.styles"

export function SceneMenu() {
    const { scene, setScene } = useContext(SidebarControlsContext);

    // Todo: for ambientLight color picker add option to match the light to the background
    return (
        <StyledDropdown>
            <StyledDropdownSection>
                <StyledDropdownSectionHeader>Background</StyledDropdownSectionHeader>
                <ColorPicker name="Color" 
                    value={scene.backgroundColor}
                    handleChange={(val) => setScene({...scene, backgroundColor: val}) }
                />
            </StyledDropdownSection>
            <StyledDropdownSection>
                <StyledDropdownSectionHeader>Ambient light</StyledDropdownSectionHeader>
                <ColorPicker name="Color"
                    value={scene.ambientLight.color}
                    handleChange={(val) => setScene({...scene, ambientLight:{...scene.ambientLight, color: val} }) }
                />
                <Slider name="Intensity"
                    value={scene.ambientLight.intensity}
                    handleChange={(val) => setScene({...scene, ambientLight:{...scene.ambientLight, intensity: val} }) }
                    min={0} max={3} step={0.001} defaultValue={0.1}
                />
            </StyledDropdownSection>
        </StyledDropdown>
    );
}