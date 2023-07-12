import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { Trait } from '../Trait';

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
            return <p className='show-hide'>&#8657;</p>
        } else {
            return <p className='show-hide'>&#8659;</p>
        }
    }

    const handleLightVisible = () => {
        if(light.visible) {
            return (<i className='light-icon' 
                onClick={(e) => {
                    e.stopPropagation();
                    updateLight(light.id, 'visible', false)
                }}
                >&#128065;</i>
            );
        } else {
            // TODO: Style eye to be displayed darker using suppressed class
            return (<i className='light-icon supressed' 
                onClick={(e) => {
                    e.stopPropagation();
                    updateLight(light.id, 'visible', true)
                }}
                >&#x1F441;</i>
            );
        }
    }

    return (
        <div className="dropdown-item">
            <div className="dropdown-item-header"
                onClick={props.onClick}
            >
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
                    <Trait name="Intensity" type="number-slider"
                        value={light.intensity}
                        handleChange={(handledValue) => updateLight(light.id, 'intensity', handledValue)}
                        min={0} max={3} step={0.005} defaultValue={1}
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