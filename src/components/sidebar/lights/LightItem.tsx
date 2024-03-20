import { Slider } from '../controls/Slider';
import { SlidersArray } from '../controls/SlidersArray';
import { ColorPicker } from '../controls/ColorPicker';
import { Dropdown } from '../controls/Dropdown';
import { useSidebarControlsContext } from '../SidebarControlsContext'
import React from 'react';
import { LightWrapper } from '../../../models/Light';
import { VisibilityEyeButton } from '../../hubComponents/VisibilityEyeButton';
import { LightTypeIcon } from '../../hubComponents/LightTypeIcon';

type Props = |{
    active: boolean,
    onClick: () => void,
    light: LightWrapper
}

export const LightItem = (props: Props) => {
    const { active, light, onClick } = props;

    const { lightsList, updateLight, updateObject } = useSidebarControlsContext();

    const handleIsActive = () => {
        return active ? String.fromCharCode(8657) : String.fromCharCode(8659);
    }

    return (
        <div className={`dropdown-item ${active ? "active" : ""}`}>
            <div className="dropdown-item-header light-item-header"
                onClick={onClick}
            >
                <LightTypeIcon light = {light} />
                <Dropdown 
                    value={light.type} 
                    list={[{type: "pointLight", display: "Point light"}, {type: "spotLight", display: "Spot light"}]} 
                    handleChange={(val) => updateLight(light.id, 'type', val)}
                />
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                <VisibilityEyeButton object={light} updateProperty={updateLight} />
                {handleIsActive()}
            </div>

            {active && <div className="dropdown-item-body">
                <SlidersArray name="Position"
                    value={light.position} step={0.01}
                    handleChange={(val: [number,number,number]) => updateLight(light.id, 'position', val)}
                />
                <ColorPicker name="Color" 
                    value={light.color}
                    handleChange={(val: string) => updateLight(light.id, 'color', val)}/>
                <Slider name="Intensity"
                    value={light.intensity}
                    handleChange={(val: number) => updateLight(light.id, 'intensity', val)}
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                {light.type === "spotLight" && <>
                    <Slider name="Angle"
                        value={light.angle}
                        handleChange={(val) => updateLight(light.id, 'angle', val)}
                        min={0} max={1} step={0.002} defaultValue={0.1}
                    />
                    <Slider name="Penumbra"
                        value={light.penumbra}
                        handleChange={(val) => updateLight(light.id, 'penumbra', val)}
                        min={0} max={1} step={0.002} defaultValue={0.6}
                    />
                </>}
            </div>}
        </div>
    );
}