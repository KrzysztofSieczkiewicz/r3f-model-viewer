import { ReactComponent as SpotlightIcon } from '../../../icons/lightTypes/spotLight.svg';
import { ReactComponent as PointLightIcon } from '../../../icons/lightTypes/pointLight.svg';
import { Slider } from '../controls/Slider';
import { PositionSliders } from '../controls/PositionSliders';
import { ColorPicker } from '../controls/ColorPicker';

export function LightItem(props) {
    const { active, light, updateLight } = props;

    const handleLightType = () => {
        if(light.type === 'pointLight') {
            return <PointLightIcon className='icon type-icon' />;
        } else if (light.type === 'spotLight') {
            return <SpotlightIcon className='icon type-icon' />;
        }
    }

    const handleLightActive = () => {
        if(active) {
            return <icon className='show-hide'>&#8657;</icon>
        } else {
            return <icon className='show-hide'>&#8659;</icon>
        }
    }

    const handleLightVisible = () => {
        if(light.visible) {
            return (<icon className='icon visibility-icon' 
                onClick={(e) => {
                    e.stopPropagation();
                    updateLight(light.id, 'visible', false)
                }}
                >&#128065;</icon>
            );
        } else {
            // TODO: Style eye to be displayed darker using suppressed class
            return (<icon className='icon visibility-icon suppressed' 
                onClick={(e) => {
                    e.stopPropagation();
                    updateLight(light.id, 'visible', true)
                }}
                >&#x1F441;</icon>
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
                <ColorPicker name="Color" 
                    value={light.color}
                    handleChange={(val) => updateLight(light.id, 'color', val)}/>
                <PositionSliders name="Position"
                    value={light.position} step={0.001}
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