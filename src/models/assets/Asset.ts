import { generateNewID } from '../../utils/idUtil';
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, EditableMaterialWrapper } from './materials/EditableMaterial';
import { DEFAULT_MESH_SPHERE, PrimitiveWrapper } from './meshes/Primitive';

export enum Meshes {
    Primitive = "Primitive",
    Unwrapped = "Model",
    Scan = "Scan"
}

export enum Materials {
    Editable = "Editable",
}

export type AssetProperties = {
    name: string,
    position: [number,number,number],
    rotation: [number,number,number],
    scale: [number,number,number],
    castShadow: boolean,
    receiveShadow: boolean,
    visible: boolean
}

export type AssetWrapper = 
    { id: string, properties: AssetProperties, meshType: Meshes.Primitive, mesh: PrimitiveWrapper, materialType: Materials.Editable, material: EditableMaterialWrapper} |
    { id: string, properties: AssetProperties, meshType: Meshes.Unwrapped, mesh: PrimitiveWrapper, materialType: Materials.Editable, material: EditableMaterialWrapper} |
    { id: string, properties: AssetProperties, meshType: Meshes.Scan, mesh: PrimitiveWrapper, materialType: Materials.Editable, material: EditableMaterialWrapper}

const INIT_ASSET_LIST: AssetWrapper[] = [
    {
        id: generateNewID(),
        meshType: Meshes.Primitive,
        mesh: DEFAULT_MESH_SPHERE,
        materialType: Materials.Editable,
        material: DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Physical],
        properties: {
            name: "Sphere",
            position:[0,0,0],
            rotation:[0,0,0],
            scale:[1,1,1],
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
    }
]

const getDefaultAsset = (): AssetWrapper => {
    return {
        id: generateNewID(),
        meshType: Meshes.Primitive,
        mesh: DEFAULT_MESH_SPHERE,
        materialType: Materials.Editable,
        material: DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Standard],
        properties: {
            name: "pear",
            position:[0.25,0.5,0.75],
            rotation:[0,0,0],
            scale:[1,1,1],
            castShadow: true,
            receiveShadow: true,
            visible: true,
        }
    };
}

export { INIT_ASSET_LIST, getDefaultAsset };