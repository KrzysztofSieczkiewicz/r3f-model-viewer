import { nanoid } from 'nanoid';
import { useContext, useState } from 'react';

const defaultLight = {
    type: "pointLight",
    color: [0,1,1],
    intensity: 1,
    angle: 0.6,
    penumbra: 0.6
}

export const LightHelper = () => {
    const lightsList = useContext(lightsList);    

    const addLight = () => {
        const light = defaultLight;
        light.id = nanoid(4);

        lightsList =[...lightsList, light];
    }

    const removeLight = (id) => {
        const updatedList = lightsList.current.filter(light => light.id !== id);
        //setLightsList(updatedList); // filter array
    }

    const updateLight = (id, light) => {
        lightsList[id] = light;
        console.log("Tried to update id:" + id + "With light: " + light);
    }

    return {
        lightsList,
        addLight,
        removeLight,
        updateLight
    }
}