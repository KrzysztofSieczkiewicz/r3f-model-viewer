import { nanoid } from 'nanoid';
import { useState } from 'react';

const defaultLight = {
    type: "pointLight",
    color: [0,1,1],
    intensity: 1,
    angle: 0.6,
    penumbra: 0.6
}

function LightHelper() {
    const [lightsList, setLightsList] = useState([defaultLight]);

    function addLight() {
        const light = defaultLight;
        light.id = nanoid(4);

        setLightsList([...lightsList, light]);
    }

    function removeLight(id) {
        const updatedList = lightsList.current.filter(light => light.id !== id);
        setLightsList(updatedList);
    }

    function updateLight(id, light) {

    }
}

export default LightHelper;