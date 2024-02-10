import { nanoid } from 'nanoid';
import { Euler, PointLight, Vector3 } from "three";

import { LightWrapper } from "../interfaces/light.model";

export class LightsService {
    static createDefault(): LightWrapper {
        return {
            id: nanoid(5),
            position: new Vector3(0,0,0),
            rotation: new Euler(0,0,0),
            color: '#ffffff',
            intensity: 1,
            angle: 0.6,
            penumbra: 0.6,
            type: PointLight,
            visible: true,
        };
    }

    static addLight(lightsArray: LightWrapper[]): LightWrapper[] {
        const updatedArray = [...lightsArray];
        const newLight = LightsService.createDefault();
    
        updatedArray.push(newLight)
    
        return updatedArray;
    }
    
    static updateLight(lightsArray: LightWrapper[], id: string, light: LightWrapper): LightWrapper[] {
        const updatedArray = [...lightsArray];
        const index = updatedArray.findIndex(light => light.id === id);
    
        updatedArray[index] = light;
    
        return updatedArray;
    }
    
    static deleteLight(lightsArray: LightWrapper[], id: string): LightWrapper[] {
        const updatedArray = [...lightsArray];
        const index = updatedArray.findIndex(light => light.id === id);
    
        updatedArray.splice(index, 1);
    
        return updatedArray;
    }
    
}