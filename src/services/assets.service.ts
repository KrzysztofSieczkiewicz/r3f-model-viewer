import { nanoid } from 'nanoid';
import { Euler, Vector3 } from "three";

import { AssetWrapper } from "../interfaces/asset.model";

export class AssetsService {
    static createDefault(): AssetWrapper {
        return {
            id: nanoid(5),
            name: "pear", // TODO: should be replaced by getting name from api call
            object: "toBeReplaced", // TODO: should be replaced by getting name from api call
            position: new Vector3(0,0,0),
            rotation: new Euler(0,0,0),
            scale: new Vector3(10,10,10),
            castShadow: true,
            receiveShadow: true,
            visible: true,
        };
    }

    static addAsset (assetsArray: AssetWrapper[]): AssetWrapper[] {
        const updatedArray = [...assetsArray];
        const newAsset = AssetsService.createDefault();
    
        updatedArray.push(newAsset)
    
        return updatedArray;
    }

    static updateAsset(assetsArray: AssetWrapper[], id: string, asset:AssetWrapper): AssetWrapper[] {
        const updatedArray = [...assetsArray];
        const index = updatedArray.findIndex(asset => asset.id === id);
    
        if (index !== -1) {
            updatedArray[index] = asset;
        }

        return updatedArray;
    }

    static deleteAsset (assetsArray: AssetWrapper[], id: string): AssetWrapper[] {
        const updatedArray = [...assetsArray];
        const index = updatedArray.findIndex(asset => asset.id === id);
    
        updatedArray.splice(index, 1);
    
        return updatedArray;
    }
}