import { nanoid } from 'nanoid';
import { Euler, Vector3 } from "three";

import { AssetWrapper } from "../interfaces/asset.model";
import { SceneWrapper } from '../interfaces/scene.model';

export class SceneService {
    createDefault(): SceneWrapper {
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

    static addAsset (assetsArray: SceneWrapper[]): SceneWrapper[] {
        const newAsset = new AssetsService().createDefault();
    
        assetsArray.push(newAsset)
    
        return assetsArray;
    }

    static updateAsset(assetsArray: SceneWrapper[], id: string, asset:SceneWrapper): SceneWrapper[] {
        const index = assetsArray.findIndex(asset => asset.id === id);
    
        assetsArray[index] = asset;
    
        return assetsArray;
    }

    static deleteAsset (assetsArray: SceneWrapper[], id: string): SceneWrapper[] {
        const index = assetsArray.findIndex(asset => asset.id === id);
    
        assetsArray.splice(index, 1);
    
        return assetsArray;
    }
}