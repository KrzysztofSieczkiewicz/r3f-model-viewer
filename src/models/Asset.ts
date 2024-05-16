import { nanoid } from 'nanoid';

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

const INIT_ASSET_LIST: AssetWrapper[] = [
    {
    id: nanoid(5),
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
    id: nanoid(5),
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
    id: nanoid(5),
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