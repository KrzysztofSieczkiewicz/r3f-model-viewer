import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';
import { ReactComponent as Visible } from '../../icons/eye-on.svg';
import { ReactComponent as Invisible } from '../../icons/eye-off.svg';
import { useContext, useState } from 'react';
import SidebarControlsContext from '../SidebarControlsContext'
import { Slider } from './Slider';

export function LightsMenu(props) {
    const { updateLight } = useContext(SidebarControlsContext);

    const lightsList = props.lightsList;
    const light = lightsList[0];

    const [isOpen, setIsOpen] = useState(true);

    function handleOpen() {
        setIsOpen(!isOpen);
    }

    const newLight = {
        id:0,
        position:[5,5,0],
        color: "#f53259",
        intensity:10,
        angle: 0.6,
        penumbra: 0.6,
        type:"spotLight"
    }
   
    return (
        <div className="dropdown">
            <div className="dropdown-item-header"
            onClick={() => handleOpen()}>
                <SpotlightIcon className='light-icon' />
                <p>{light.type}</p>
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                <Visible className='light-icon' />
                <p>S/H</p>
            </div>
            {isOpen &&
                <div className="dropdown-item-body">
                    <label className='trait-name'>Color:</label>
                    <div className='trait'> {light.color} </div>
                    <label className='trait-name'>Position:</label>
                    <div className='trait'> {light.position} </div>
                    <label className='trait-name'>Intensity</label>
                    <input 
                        className='trait'
                        value={light.intensity} 
                        onChange={(e) => updateLight(light.id, {...light, intensity: e.target.value})}
                    />
                    <label className='trait-name'>Angle:</label>
                    <input 
                        className='trait'
                        value={light.angle} 
                        onChange={(e) => updateLight(light.id, {...light, angle: e.target.value})}
                    />
                    <label className='trait-name'>Penumbra:</label>
                    <input 
                        className='trait'
                        value={light.penumbra} 
                        onChange={(e) => updateLight(light.id, {...light, penumbra: e.target.value})}
                    />
                    <Slider min={-15} max={15} value={-7} step={1}/>
                </div>}
        </div>
    );

    //// ASAP: FIX STYLING -> 

}