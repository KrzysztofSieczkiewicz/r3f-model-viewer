import { nanoid } from 'nanoid';
import { Euler, Vector3 } from "three";

import { AssetWrapper } from "../interfaces/asset.model";

export class AssetService {
    createDefault(): AssetWrapper {
        return {
            id: nanoid(5),
            name: "pear", // TODO: should be replaced by getting name from api call
            object: "object address?", // TODO: should be replaced by getting name from api call
            position: new Vector3(0,0,0),
            rotation: new Euler(0,0,0),
            scale: new Vector3(0,0,0),
            castShadow: true,
            receiveShadow: true,
            visible: true,
        };
    }
}