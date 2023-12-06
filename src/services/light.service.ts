import { nanoid } from 'nanoid';
import { Euler, PointLight, Vector3 } from "three";

import { LightWrapper } from "../interfaces/light.model";

export class LightService {
    createDefault(): LightWrapper {
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
}