import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { LoaderProto, useLoader } from "@react-three/fiber";
import { GeometryMetadata } from "../models/assets/meshes/Unwrapped";

export type ListedMetadataGLTF = {
    mesh: GeometryMetadata,
    materials: MaterialMetadataGLTF[]
}

export type MaterialMetadataGLTF = {
    id: string,
    name: string,
    type: string,
    traversalIndex: number,
}

export type LoadingRestultGLTF = {
    geometry: THREE.BufferGeometry;
    materials?: THREE.Material[];
}


// TODO: very basic implementation - find a better way to recognize file type
const getFileLoaderClass = (fileName: string) => {
    const parts = fileName.split( '.');
    const extension = parts[parts.length-1].toLowerCase();
    
    switch(extension) {
        case 'gltf':
        case 'glb':
            return GLTFLoader;
        case 'fbx':
            return FBXLoader;
        case 'obj':
            return OBJLoader;
        case 'stl':
            return STLLoader;
        default:
            console.error('Failed to recognize the file format for file: ', fileName);
            return null;
    }
}


export const useFileLoad = () => {

    const load = (url: string) => {
        const LoaderClass = getFileLoaderClass(url);

        if (!LoaderClass) {
            console.error("No loader found for URL: ", url);
            return null;
        }

        const loadedFile = useLoader(LoaderClass as LoaderProto<any>, url);

        return loadedFile;
    }

    // TODO: replace requiredMeshes and requiredMaterials with required: ListedMetadataGLTF

    const loadGLTFContents = (data: GLTF, requiredMeshes?: GeometryMetadata[], requiredMaterials?: MaterialMetadataGLTF[]) => { // : LoadingRestultGLTF
        if (!data.scene) {
            console.error("Unable to process file data, provided data is not a valid GLTF or GLB file");
        }

        const meshesToFind = [...(requiredMeshes || [])];
        const materialsToFind = [...(requiredMaterials || [])];

        let foundGeometries: THREE.BufferGeometry[] = [];
        let foundMaterials: THREE.Material[] = [];

        const meshNamesCounts: {[name: string]: number} = {};

        data.scene.traverse( (object) => {
            if (foundMaterials.length === requiredMaterials?.length &&
                foundGeometries.length === requiredMeshes?.length) {
                return;
            } else if (!(object instanceof THREE.Mesh)) return;
            

        });
    }
 
    // Find matching mesh given the requiredMeshes[] and current gltf node
    const findMeshGeometryGLTF = (
        node: THREE.Mesh, 
        meshesToFind: GeometryMetadata[],
        meshNamesCounts: {[name: string]: number}
    ): { geometry?: THREE.BufferGeometry; remainingMeshes: GeometryMetadata[] } => {

        const meshName = node.name;
        const currentTraversalIndex = meshNamesCounts[meshName] ?? 0;

        const matchedMeshIndex = meshesToFind.findIndex( (searchedMesh) => {
            return meshName === searchedMesh.name && currentTraversalIndex === searchedMesh.traversalIndex;
        });

        meshNamesCounts[meshName] = currentTraversalIndex + 1;

        if (matchedMeshIndex !== -1) {
            const remainingMeshes = meshesToFind.filter((_, index) => index !== matchedMeshIndex);
            return {
                geometry: node.geometry,
                remainingMeshes: remainingMeshes
            };
        }
        return {
            remainingMeshes: meshesToFind
        };
    }

    // Find all matching materials given the requiredMaterials[] and current gltf node
    const findMaterialsGLTF = (
        node: THREE.Mesh,
        materialsToFind: MaterialMetadataGLTF[],
        materialNamesCounts: {[name: string]: number}
    ): { materials?: THREE.Material[]; remainingMaterials: MaterialMetadataGLTF[] } => {

        const materialsFound: THREE.Material[] = [];
        const indicesFound = new Set<number>();
        
        const meshMaterials = Array.isArray(node.material)
                            ? node.material
                            : [node.material].filter(Boolean);

        meshMaterials.forEach( (meshMaterial) => {
            const meshMaterialName = meshMaterial.name;
            const meshMaterialIndex = materialNamesCounts[meshMaterialName] ?? 0;

            const matchedMaterialIndex = materialsToFind.findIndex( (searchedMaterial) => {    
                return meshMaterialName === searchedMaterial.name && meshMaterialIndex === searchedMaterial.traversalIndex
            });

            materialNamesCounts[meshMaterialName] = meshMaterialIndex + 1;

            if (matchedMaterialIndex !== -1) {
                materialsFound.push(meshMaterial);
                indicesFound.add(matchedMaterialIndex);
            }
        });

        const remainingMaterials = materialsToFind.filter((_, index) => !indicesFound.has(index));

        if (materialsFound.length > 0) {
            return {
                materials: materialsFound,
                remainingMaterials: remainingMaterials
            };
        }
        return { remainingMaterials: materialsToFind }
    }
}