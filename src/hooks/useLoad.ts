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
            
            const meshName = object.name;
            const meshTraversalIndex = meshNamesCounts[meshName] | 0;

            requiredMeshes?.forEach( (requiredMesh) => {
                if (object.name === requiredMesh.name && meshTraversalIndex === requiredMesh.traversalIndex) {
                    foundGeometries.push(object.geometry);
                    
                    if (requiredMaterials && requiredMaterials.length > 0) {
                        const materialNamesCounts: {[name: string]: number} = {};
                        const meshMaterials = Array.isArray(object.material)
                            ? object.material
                            : [object.material].filter(Boolean);

                        requiredMaterials.forEach( (requiredMatMetadata) => {
                            const foundMat = meshMaterials.find( (material) => {
                                const materialTraversalIndex = materialNamesCounts[material.name] || 0;
                                materialNamesCounts[material.name] = materialTraversalIndex + 1;

                                return (
                                    material.name === requiredMatMetadata.name &&
                                    materialTraversalIndex === requiredMatMetadata.traversalIndex
                                );
                            });

                            if (foundMat) {
                                foundMaterials.push(foundMat);
                            } else {
                                console.warn(`Required material "${requiredMatMetadata.name}" (traversal index ${requiredMatMetadata.traversalIndex}) not found for mesh "${requiredMesh.name}".`);
                            }
                        });
                    } else if (!requiredMaterials) {
                        if (Array.isArray(object.material)) {
                            foundMaterials = [...object.material];
                        } else if (object.material) {
                            foundMaterials.push(object.material);
                        }
                    }
                } else {
                    meshNamesCounts[meshName] = meshTraversalIndex + 1;
                    return;
                }
            });

            if (requiredMeshes && requiredMeshes?.length > 0) {
                if (foundGeometries.length === 0) {
                    console.error(`Failed to load contents from the file. No requested meshes found.`);
                } else if (foundGeometries.length !== requiredMeshes.length) {
                    console.warn(`Failed to load some of the geometries from the file.`);
                }
            } else if (requiredMaterials && requiredMaterials?.length > 0) {
                if (foundMaterials.length === 0) {
                    console.error(`Failed to load contents from the file. No requested materials found.`);
                } else if (foundMaterials.length !== requiredMaterials.length) {
                    console.warn(`Failed to load some of the materials from the file.`);
                }
            } 

        });
    }
 
    // Find matching mesh given the requiredMeshes[] and current gltf node
    const checkMeshGLTF = (
        node: THREE.Mesh, 
        meshesToFind: GeometryMetadata[],
        meshNamesCounts: {[name: string]: number}) => {

        const meshName = node.name;
        const meshTraversalIndex = meshNamesCounts[meshName] | 0;

        const matchedMeshIndex = meshesToFind.findIndex( (checkedMesh) => {
            return meshName === checkedMesh.name && meshTraversalIndex === checkedMesh.traversalIndex
        });

        if (matchedMeshIndex !== -1) {
            return meshesToFind.splice(matchedMeshIndex, 1)[0];
        }
    }

    // Find all matching materials given the requiredMaterials[] and current gltf node
    const findMaterialsGLTF = (
        node: THREE.Mesh,
        materialsToFind: MaterialMetadataGLTF[],
        materialNamesCounts: {[name: string]: number}) => {

        const materialsFound: MaterialMetadataGLTF[] = [];
        
        const meshMaterials = Array.isArray(node.material)
                            ? node.material
                            : [node.material].filter(Boolean);

        meshMaterials.forEach( (meshMaterial) => {
            const matchedMaterialIndex = materialsToFind.findIndex( (searchedMaterial) => {
                const meshMaterialName = meshMaterial.name;
                const meshMaterialIndex = materialNamesCounts[meshMaterialName] | 0;
                return meshMaterialName === searchedMaterial.name && meshMaterialIndex === searchedMaterial.traversalIndex
            });

            if(matchedMaterialIndex !== -1) {
                const materialFound = materialsToFind.splice(matchedMaterialIndex, 1)[0];
                materialsFound.push(materialFound);
            }
        });

        return materialsFound;
    }
}