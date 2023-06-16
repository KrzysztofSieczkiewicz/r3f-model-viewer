export function LightPanel(props) {
    const removeLight = props.removeLight;

    return (
        <>
            <p>Type: {props.light.type}</p>
            <p>Color: {props.light.color}</p>
            <p>Position: {props.light.position}</p>
            <p>Intensity: {props.light.intensity}</p>
            <button onClick={() => {removeLight(props.light.id)}}>REMOVE</button>
        </>
    );
    //TODO add conditional display of another traits depending on light type
}