import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { Slider } from '../controls/Slider';
import { PositionSliders } from '../controls/PositionSliders';

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
                    <PositionSliders name="Position"
                        value={light.position}
                        min={-10} max={10}
                    />
                </div>
                <div className='trait'>
                    <Slider name="Intensity"
                        value={light.intensity}
                        handleChange={(handledValue) => updateLight(light.id, 'intensity', handledValue)}
                        min={0} max={3} step={0.005} defaultValue={1}
                    />
                </div>
                {light.type === "spotLight" && <>
                    <div className='trait'>
                        <Slider name="Angle"
                            value={light.angle}
                            handleChange={(handledValue) => updateLight(light.id, 'angle', handledValue)}
                            min={0} max={1} step={0.002} defaultValue={0.6}
                        />
                    </div>
                    <div className='trait'>
                        <Slider name="Penumbra"
                            value={light.penumbra}
                            handleChange={(handledValue) => updateLight(light.id, 'penumbra', handledValue)}
                            min={0} max={1} step={0.002} defaultValue={0.6}
                        />
                    </div>
                </>}
            </div>}

        </div>
    );
}