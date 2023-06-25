import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';
import { ReactComponent as Visible } from '../../icons/eye-on.svg';
import { ReactComponent as Invisible } from '../../icons/eye-off.svg';
import { useState } from 'react';

export function LightsMenu(props) {
    const lightsList = props.lightsList;
    const light = lightsList[0];

    const [isOpen, setIsOpen] = useState(true);

    function handleOpen() {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    console.log(light.color)    
    /* For each light -> create header with type icon, name and circle displaying color and intensity */
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
                <div className="dropdown-item-body"
                onClick={() => handleOpen()}>
                    <label className='trait-name'>Color:</label>
                    <div className='trait'> {light.color} </div>
                    <label className='trait-name'>Position:</label>
                    <div className='trait'> {light.position} </div>
                    <label className='trait-name'>Intensity</label>
                    <div className='trait'> {light.intensity} </div>
                    <label className='trait-name'>Angle:</label>
                    <div className='trait'> {light.angle} </div>
                    <label className='trait-name'>Penumbra:</label>
                    <div className='trait'> {light.penumbra} </div>
                </div>}
        </div>
    );

    //// ASAP: FIX STYLING -> 

}