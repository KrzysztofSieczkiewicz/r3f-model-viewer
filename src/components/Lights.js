import { nanoid } from 'nanoid';

const defaultLight = {
    type: "pointLight",
    color: [0,1,1],
    intensity: 1,
    angle: 0.6,
    penumbra: 0.6
}

export function Lights(props) {
    const lightsList = props.lightsList;

    function addLight() {
        const light = defaultLight;
        light.id = nanoid(4);

        props.setLightsList([...lightsList, light]);
    }

    function removeLight(id) {
        props.setLightsList(lightsList.current.filter(light => light.id !== id));
    }

    function updateLight(id, light) {
        props.setLightsList((lightsList) => {
            const newLightsList = [...lightsList];
            newLightsList[id] = light;
        });
    }

    return (
        <>
            {lightsList.map((light) => {
                if (light.type === 'pointLight') {
                return <pointLight 
                    key={light.ref} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity} 
                    />;
                } else if (light.type === 'spotLight') {
                return <spotLight 
                    key={light.ref} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity}
                    />;
                } else {
                return null;
                }
            })}
        </>
    );
}