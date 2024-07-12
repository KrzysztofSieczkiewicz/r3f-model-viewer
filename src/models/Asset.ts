import { generateNewID } from '../utils/idUtil';
import { PrimitiveWrapper, Primitives } from './Primitive';

export enum Assets {
    Primitive,
    Unwrapped,
    Scan
}

// TODO: Move isSelected prop from AssetProperties to SceneContext
export type AssetProperties = {
    name: string,
    position: [number,number,number],
    rotation: [number,number,number],
    scale: [number,number,number],
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean,
    isSelected: boolean,
}


export type AssetWrapper = 
    { id: string, properties: AssetProperties, type: Assets.Primitive, mesh: PrimitiveWrapper } |
    { id: string, properties: AssetProperties, type: Assets.Unwrapped, mesh: PrimitiveWrapper } |
    { id: string, properties: AssetProperties, type: Assets.Scan, mesh: PrimitiveWrapper }

const INIT_ASSET_LIST: AssetWrapper[] = [
    {
        id: generateNewID(),
        type: Assets.Primitive,
        mesh: {
            type: Primitives.Sphere,
            properties: {
                radius: 1,
                heightSegments: 4,
                widthSegments: 8
            }
        },
        properties: {
            name: "Sphere",
            position:[0,0,0],
            rotation:[0,0,0],
            scale:[10,10,10],
            isSelected: false,
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
        }
]

const TMP_INIT_ASSET_LIST: AssetWrapper[] = [
    {
    id: generateNewID(),
    type: Assets.Scan,
    mesh: {
        type: Primitives.Sphere,
        properties: {
            radius: 1,
            heightSegments: 4,
            widthSegments: 8
        }
    },
    properties: {
        name: "pear",
        position:[0,0,0],
        rotation:[0,0,0],
        scale:[10,10,10],
        isSelected: false,
        castShadow: true,
        receiveShadow: true,
        visible: true,
    }
    },{
    id: generateNewID(),
    type: Assets.Scan,
    mesh: {
        type: Primitives.Sphere,
        properties: {
            radius: 1,
            heightSegments: 4,
            widthSegments: 8
        }
    },
    properties: {
        name: "pear",
        position:[1,0,1],
        rotation:[0,Math.PI,0],
        scale:[10,10,10],
        isSelected: false,
        castShadow: true,
        receiveShadow: true,
        visible: true,
    }
    }
]

const DEFAULT_ASSET: AssetWrapper = {
    id: generateNewID(),
    type: Assets.Primitive,
    mesh: {
        type: Primitives.Sphere,
        properties: {
            radius: 1,
            heightSegments: 4,
            widthSegments: 8
        }
    },
    properties: {
        name: "pear",
        position:[0.25,0.5,0.75],
        rotation:[0,0,0],
        scale:[10,10,10],
        isSelected: false,
        castShadow: true,
        receiveShadow: true,
        visible: true,
    }
}

export { INIT_ASSET_LIST, DEFAULT_ASSET };