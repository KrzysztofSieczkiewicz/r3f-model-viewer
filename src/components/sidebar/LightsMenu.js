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

    /* For each light -> create header with type icon, name and circle displaying color and intensity */
    return (
        <div className="dropdown">
            <div className="dropdown-item-header"
            onClick={() => handleOpen()}>
                <SpotlightIcon className='light-icon' />
                <p>{light.type}</p>
                <p className="color-preview">O</p>
                <Visible className='light-icon' />
                <p>S/H</p>
            </div>
            {isOpen &&
                <>
                    <div> SOME RANDOM RAMBLING</div>
                    <div> AND EVEN MORE RAMBLING </div>
                </>}
        </div>
    );

    //// ASAP: FIX STYLING -> 

}