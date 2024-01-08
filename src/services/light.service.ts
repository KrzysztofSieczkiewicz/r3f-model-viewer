import { nanoid } from 'nanoid';
import { Euler, PointLight, Vector3 } from "three";

import { LightWrapper } from "../interfaces/light.model";

export class LightService {
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
        const newLight = LightService.createDefault();
    
        lightsArray.push(newLight)
    
        return lightsArray;
    }
    
    static updateLight(lightsArray: LightWrapper[], id: string, light:LightWrapper): LightWrapper[] {
        const index = lightsArray.findIndex(light => light.id === id);
    
        lightsArray[index] = light;
    
        return lightsArray;
    }
    
    static deleteLight(lightsArray: LightWrapper[], id: string): LightWrapper[] {
        const index = lightsArray.findIndex(light => light.id === id);
    
        lightsArray.splice(index, 1);
    
        return lightsArray;
    }
    
}