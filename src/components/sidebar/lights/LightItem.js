import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { Slider } from '../controls/Slider';
import { PositionSliders } from '../controls/PositionSliders';
import { ColorPicker } from '../controls/ColorPicker';

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
                <ColorPicker name="Color" />
                <PositionSliders name="Position"
                    value={light.position} step={0.01}
                    handleChange={(val) => updateLight(light.id, 'position', val)}
                />
                <Slider name="Intensity"
                    value={light.intensity}
                    handleChange={(val) => updateLight(light.id, 'intensity', val)}
                    min={0} max={3} step={0.005} defaultValue={1}
                />
                {light.type === "spotLight" && <>
                    <Slider name="Angle"
                        value={light.angle}
                        handleChange={(val) => updateLight(light.id, 'angle', val)}
                        min={0} max={1} step={0.002} defaultValue={0.6}
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