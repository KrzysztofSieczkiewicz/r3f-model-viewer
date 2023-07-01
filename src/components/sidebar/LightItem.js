import { ReactComponent as SpotlightIcon } from '../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../icons/lightTypes/pointLight.svg';
import { ReactComponent as Visible } from '../../icons/eye-on.svg';
import { ReactComponent as Invisible } from '../../icons/eye-off.svg';
import { Slider } from './Slider';

export function LightItem(props) {
    const { active, light, updateLight } = props;

    const handleLightType = () => {
        if(light.type === 'pointLight') {
            return <PointLightIcon className='light-icon' />;
        } else if (light.type === 'spotLight') {
            return <SpotlightIcon className='light-icon' />;
        }
    }

    const handleLightActive = () => {
        // TODO: replace S/H with appropriate arrows (avoid icons for this one), consider adding className
        if(active) {
            return <p className='show-hide'>H</p>
        } else {
            return <p className='show-hide'>S</p>
        }
    }

    const handleLightVisible = () => {
        if(light.visible) {
            return <Visible className='light-icon' />;
        } else {
            return <Invisible className='light-icon' />;
        }
    }

    return (
        <div className="dropdown-item" key={light.id}>
            <div className="dropdown-item-header"
                onClick={props.onClick}>
                {handleLightType()}
                <p>{light.type}</p>
                <div className="color-preview" style={{backgroundColor: light.color}}/>
                {handleLightVisible()}
                {handleLightActive()}
            </div>

            {active && <div className="dropdown-item-body">
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