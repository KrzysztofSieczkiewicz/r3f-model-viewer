import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';
import { ReactComponent as Visible } from '../../icons/eye-on.svg';
import { ReactComponent as Invisible } from '../../icons/eye-off.svg';
import { Slider } from './Slider';

import { useState } from "react";

export function LightItem(props) {
    const { light, updateLight } = props;

    const [activeItem, setActiveItem] = useState();

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null);
        } else {
            setActiveItem(item)
        }
    };

    return (
        <div className="dropdown-item" key={light.id}>
            <div className="dropdown-item-header"
                onClick={() => handleItemClick(light.id)}>
                <SpotlightIcon className='light-icon' />
                <p>{light.type}</p>
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                <Visible className='light-icon' />
                <p>S/H</p>
            </div>

            {activeItem === light.id && <div className="dropdown-item-body">
                <div className='trait'>
                    <label className='trait-name'>Color:</label>
                    <div className='trait-input'> {light.color} </div>
                </div>
                <div className='trait'>
                    <label className='trait-name'>Position:</label>
                    <div className='trait-input'> {light.position} </div>
                </div>
                <div className='trait'>
                    <label className='trait-name'>Intensity</label>
                    <input
                        className='trait-input'
                        value={light.intensity}
                        onChange={(e) => updateLight(light.id, {...light, intensity: e.target.value})}
                    />
                </div>
                <div className='trait'>
                    <label className='trait-name'>Angle:</label>
                    <input
                        className='trait-input'
                        value={light.angle}
                        onChange={(e) => updateLight(light.id, {...light, angle: e.target.value})}
                    />
                </div>
                <div className='trait'>
                    <label className='trait-name'>Penumbra:</label>
                    <input
                        className='trait-input'
                        value={light.penumbra}
                        onChange={(e) => updateLight(light.id, {...light, penumbra: e.target.value})}
                    />
                </div>
                
            </div>}

        </div>
    );
}

// <Slider min={-15} max={15} value={-7} step={1}/>