import { generateNewID } from '../utils/idUtil';
import { PrimitiveProperties, PrimitiveWrapper, Primitives } from './Primitive';

export enum Assets {
    Primitive,
    Unwrapped,
    Scan
}

// TODO: Move isSelected prop from AssetWrapper to SceneContext
export type AssetWrapper = {
    id: string,
    object: string,
    name: string,
    position: [number,number,number],
    rotation: [number,number,number],
    scale: [number,number,number],
    ref: HTMLDivElement | null,
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
    isSelected: boolean,
}

export type NewAssetWrapper = 
    { id: string, type: Assets.Primitive, mesh: PrimitiveWrapper } |
    { id: string, type: Assets.Scan, mesh: AssetWrapper };

export const NEW_INIT_ASSET_LIST: NewAssetWrapper[] = [
    {
    id: generateNewID(),
    type: Assets.Primitive,
    mesh: {
        type: Primitives.Sphere,
        properties: {
            radius: 1,
            horizontalTris: 3,
            vertivalTris: 3,
            }
        }
    }
]

const INIT_ASSET_LIST: AssetWrapper[] = [
    {
    id: generateNewID(),
    name: "pear",
    object: "toBeReplaced",
    position:[0,0,0],
    rotation:[0,0,0],
    scale:[10,10,10],
    ref: null,
    isSelected: false,
    castShadow: true,
    receiveShadow: true,
    visible: true,
    },{
    id: generateNewID(),
    name: "pear",
    object: "toBeReplaced",
    position:[1,0,1],
    rotation:[0,Math.PI,0],
    scale:[10,10,10],
    ref: null,
    isSelected: false,
    castShadow: true,
    receiveShadow: true,
    visible: true,
    }
]

const defaultAsset: AssetWrapper = {
    id: generateNewID(),
    name: "pear",
    object: "toBeReplaced",
    position:[0.25,0.5,0.75],
    rotation:[0,0,0],
    scale:[10,10,10],
    ref: null,
    isSelected: false,
    castShadow: true,
    receiveShadow: true,
    visible: true,
}

export { INIT_ASSET_LIST, defaultAsset };