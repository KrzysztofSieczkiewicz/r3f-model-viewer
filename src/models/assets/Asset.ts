import { generateNewID } from '../../utils/idUtil';
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, EditableMaterialWrapper } from './materials/EditableMaterial';
import { DEFAULT_MESH_SPHERE, PrimitiveWrapper } from './meshes/Primitive';
import { UnwrappedWrapper } from './meshes/Unwrapped';

export enum Meshes {
    Primitive = "Primitive",
    Unwrapped = "Model",
    Scan = "Scan"
}

export enum Materials {
    Editable = "Editable",
}

export type AssetProperties = {
    position: [number,number,number],
    rotation: [number,number,number],
    scale: [number,number,number],
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean
}

// TODO: GET RID OF materialType, change meshType into just 'type'?
// ALTHOUGH YOU CAN FIND A WAY TO ASSIGN EDITABLE MATERIALS FOR EACH meshType,
// AND Mapped materials for Models and Scans etc...
// TODO: Find if meshType Unwrapped and meshType scanned require anything to store in the mesh variable (if not -> remove them)
// and adjust the application not to require that shit
// TODO: CONSIDER HANDLING ASSET WRAPPER WITH WILDCARD TO ALLOW COMPONENTS USING AssetWrapper TO ALREADY KNOW WHAT MESH TYPE IS INSIDE?
// OR JUST MAKE THEM LOOK INSIDE AND ACT BASED ON TYPES
export type PrimitiveAssetWrapper = { id: string, name: string, properties: AssetProperties, meshType: Meshes.Primitive, mesh: PrimitiveWrapper, materialType: Materials.Editable, material: EditableMaterialWrapper};
export type UnwrappedAssetWrapper = { id: string, name: string, properties: AssetProperties, meshType: Meshes.Unwrapped, mesh: UnwrappedWrapper, materialType: Materials.Editable, material: EditableMaterialWrapper};
export type ScanAssetWrapper = { id: string, name: string, properties: AssetProperties, meshType: Meshes.Scan, mesh: PrimitiveWrapper, materialType: Materials.Editable, material: EditableMaterialWrapper};

export type AssetWrapper = 
    PrimitiveAssetWrapper |
    UnwrappedAssetWrapper |
    ScanAssetWrapper;

const INIT_ASSET_LIST: AssetWrapper[] = [
    {
        id: generateNewID(),
        name: "Sphere",
        meshType: Meshes.Primitive,
        mesh: DEFAULT_MESH_SPHERE,
        materialType: Materials.Editable,
        material: DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Physical],
        properties: {
            position:[0,0,0],
            rotation:[0,0,0],
            scale:[1,1,1],
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
    },
    {
        id: generateNewID(),
        name: "Sphere",
        meshType: Meshes.Unwrapped,
        mesh: {
            //src: "models/pear/Pear2_LOD0.gltf"
            src: "models/car/scene.gltf"
        },
        materialType: Materials.Editable,
        material: DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Physical],
        properties: {
            position:[0,0,0],
            rotation:[0,0,0],
            scale:[10,10,10],
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
    }
]

const getDefaultAsset = (): AssetWrapper => {
    return {
        id: generateNewID(),
        name: "pear",
        meshType: Meshes.Primitive,
        mesh: DEFAULT_MESH_SPHERE,
        materialType: Materials.Editable,
        material: DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Standard],
        properties: {
            position:[0.25,0.5,0.75],
            rotation:[0,0,0],
            scale:[1,1,1],
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
    };
}

const getDefaultUnwrappedAsset = (): UnwrappedAssetWrapper => {
    return {
        id: generateNewID(),
        name: "pear",
        meshType: Meshes.Unwrapped,
        mesh: {
            src: ""
        },
        materialType: Materials.Editable,
        material: DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Standard],
        properties: {
            position:[0,0,0],
            rotation:[0,0,0],
            scale:[1,1,1],
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
    };
}

export { INIT_ASSET_LIST, getDefaultAsset, getDefaultUnwrappedAsset };