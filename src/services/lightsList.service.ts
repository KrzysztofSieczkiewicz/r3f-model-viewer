import { LightWrapper } from "../interfaces/light.model";
import { LightService } from "./light.service";

const addLight = (lightsArray: LightWrapper[]): LightWrapper[] => {
    const newLight = new LightService().createDefault();

    lightsArray.push(newLight)

    return lightsArray;
}

const updateLight = (lightsArray: LightWrapper[], id: string, light:LightWrapper): LightWrapper[] => {
    const index = lightsArray.findIndex(light => light.id === id);

    lightsArray[index] = light;

    return lightsArray;
}

const deleteLight = (lightsArray: LightWrapper[], id: string): LightWrapper[] => {
    const index = lightsArray.findIndex(light => light.id === id);

    lightsArray.splice(index, 1);

    return lightsArray;
}