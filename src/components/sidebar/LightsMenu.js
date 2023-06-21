import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';

export function LightsMenu(props) {
    const lightsList = props.lightsList;
    const light = lightsList[0];

    /* For each light -> create header with type icon, name and circle displaying color and intensity */

    return (
        <div className="dropdown">
            <div class="dropdown-item light-header">
                <SpotlightIcon className='icon-left' />
                <p>{light.type}</p>
                <div className="color-preview"></div>
                <div>on/off</div>
                <div>Show/Hide</div>
            </div>
        </div>
    );

}