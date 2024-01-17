import { useContext } from "react";
import { LightType, LightWrapper } from "../../../interfaces/light.model";
import { SidebarControlsContext } from "../SidebarControlsContext";
import THREE, { Vector3 } from "three";
import LightTypeDropdown from "../controls/LightTypeDropdown";
import { LightsService } from "../../../services/lights.service";
import { SlidersArray } from "../controls/SlidersArray";
import Slider from "../controls/Slider";
import { ColorPicker } from "../controls/ColorPicker";

interface LightItem {
    active: boolean,
    light: LightWrapper,
    onClick: () => void;
}

export function LightItem( {active, light} :LightItem) {
    const { lightsList, setLightsList } = useContext(SidebarControlsContext);

    const handleLightType = () => {
        return(<>
            {light.type === THREE.PointLight && <PointLightIcon className='type-icon header-icon' />}
            {light.type === THREE.SpotLight && <SpotlightIcon className='type-icon header-icon'  />}
            <LightTypeDropdown selected={light.type}
                    handleChange={(val: LightType) => setLightsList( LightsService.updateLight(lightsList, light.id, {...light, type: val}) )}
            />
        </>)
    }

    const handleLightActive = () => {
        if(active) {
            return <span className='show-hide header-icon'>&#8657;</span>
        } else {
            return <span className='show-hide header-icon'>&#8659;</span>
        }
    }

    const handleLightVisible = () => {
        return (<span className={`visibility-icon header-icon ${!light.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                setLightsList( LightsService.updateLight(lightsList, light.id, {...light, visible: !light.visible}) );
            }}
            >&#128065;</span>
        );
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header light-item-header"
                //onClick={onClick} // TODO: REINSTATE THIS IF NECESSARY
            >
                {handleLightType()}
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                {handleLightVisible()}
                {handleLightActive()}
            </div>

            {active && <div className="dropdown-item-body">
                <SlidersArray name="Position"
                
                    value={light.position ? light.position.toArray().map(Number) : []} step={0.01}
                    handleChange={(val) => setLightsList( LightsService.updateLight(lightsList, light.id, {...light, position: new Vector3(...val)}) ) }
                />
                <ColorPicker name="Color" 
                    value={light.color}
                    handleChange={(val: string) => setLightsList( LightsService.updateLight(lightsList, light.id, {...light, color: val}) ) }
                />
                <Slider name="Intensity"
                    value={light.intensity}
                    handleChange={(val: number) => setLightsList( LightsService.updateLight(lightsList, light.id, {...light, intensity: val}) ) }
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                {light.type === THREE.SpotLight && <>
                    <Slider name="Angle"
                        value={light.angle}
                        handleChange={(val: number) => setLightsList( LightsService.updateLight(lightsList, light.id, {...light, angle: val}) ) }
                        min={0} max={1} step={0.002} defaultValue={0.1}
                    />
                    <Slider name="Penumbra"
                        value={light.penumbra}
                        handleChange={(val: number) => setLightsList( LightsService.updateLight(lightsList, light.id, {...light, penumbra: val}) ) }
                        min={0} max={1} step={0.002} defaultValue={0.6}
                    />
                </>}
            </div>}
        </div>
    );
}