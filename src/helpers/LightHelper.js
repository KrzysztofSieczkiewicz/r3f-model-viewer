import { useRef } from "react";
import { nanoid } from 'nanoid';

function LightHelper() {
    const lightsList = useRef([]);

    const defaultLight = {
        type: "pointLight",
        color: [0,1,1],
        intensity: 1,
        angle: 0.6,
        penumbra: 0.6
    }

    function addLight() {
        const light = defaultLight;
        light.id = nanoid(4);

        lightsList.push(defaultLight);
    }

    function removeLight(id) {
        lightsList.current = lightsList.current.filter(light => light.id !== id);
    }

    function updateLight(id, light) {

    }
}