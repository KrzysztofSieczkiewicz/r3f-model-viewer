import { ReactComponent as LightIcon } from '../../icons/light.svg';

export function LightMenu(props) {
    const removeLight = props.removeLight;
    const light = props.light;

    return (
        <div className="lightItem-header">
            <LightIcon className='icon-left'/>
            <p>light.type</p>
        </div>
    );
}

/*
<>
            <p>Type: {light.type}</p>
            <p>Color: {light.color}</p>
            <p>Position: 
                X:{light.position[0]},
                Y:{light.position[1]},
                Z:{light.position[2]}
            </p>
            <p>Intensity: {light.intensity}</p>
            {light.type === "spotLight" &&
                <>
                    <p>Angle: {light.angle}</p>
                    <p>Penumbra: {light.penumbra}</p>
                </>
            }
            <button onClick={() => {removeLight(light.id)}}>REMOVE</button>
        </>
*/