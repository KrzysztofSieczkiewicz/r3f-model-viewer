import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';

export function LightsMenu(props) {
    const lightsList = props.lightsList;
    const light = lightsList[0];

    /* For each light -> create header with type icon, name and circle displaying color and intensity */

    return (
        <div className="dropdown">
            <div className="dropdown-item-header">
                <SpotlightIcon className='icon-left' />
                <p>{light.type}</p>
                <p className="color-preview"></p>
                <p>on/off</p>
                <p>Show/Hide</p>
            </div>
        </div>
    );

}