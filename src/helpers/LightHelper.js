import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { AssetSceneContext } from '../AssetSceneContext';

const defaultLight = {
    type: "pointLight",
    color: [0,1,1],
    intensity: 1,
    angle: 0.6,
    penumbra: 0.6
}

let lightsList = [];

export class LightHelper {
    constructor() {};
    
    lightsList = useContext(AssetSceneContext);

    addLight = () => {
        const light = defaultLight;
        light.id = nanoid(4);

        lightsList =[...lightsList, light];
    }

    removeLight = (id) => {
        const updatedList = lightsList.current.filter(light => light.id !== id);
        //setLightsList(updatedList); // filter array
    }

    updateLight = (id, light) => {
        lightsList[id] = light;
        console.log("Tried to update id:" + id + "With light: " + light);
    }
/*
    return {
        lightsList,
        addLight,
        removeLight,
        updateLight
    }
    */
}