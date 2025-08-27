import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { LoaderProto, useLoader } from "@react-three/fiber";
import { GeometryMetadata } from "../models/assets/meshes/Unwrapped";
import { useEffect, useState } from "react";

export type ListedMetadataGLTF = {
    mesh: GeometryMetadata,
    materials: MaterialMetadataGLTF[]
}

export type MeshMetadataGLTF = {
    geometry: GeometryMetadata,
    materials?: MaterialMetadataGLTF[]
}

export type MaterialMetadataGLTF = {
    id: string,
    name: string,
    type: string,
    traversalIndex: number,
}

export type LoadingResultGLTF = {
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
            return GLTFLoader;
    }
}


export const useFileLoad = (url: string, required: MeshMetadataGLTF) => {
    console.log({url});
    const LoaderClass = getFileLoaderClass(url);
    const loadedFile = useLoader(LoaderClass as LoaderProto<any>, url);

    const [loadingResult, setLoadingResult] = useState<LoadingResultGLTF | null>(null);

    useEffect(() => {
        if (!loadedFile) {
            setLoadingResult(null);
            return;
        }

        
        switch(LoaderClass) {
            case GLTFLoader:
                const gltfResult = loadGLTFContents(loadedFile, required);
                setLoadingResult(gltfResult || null);
                break;
            default:
                console.warn("Attempt to load unsupported file type");
                setLoadingResult(null);
                break;
        }
    }, [loadedFile, required, LoaderClass]);


    const loadGLTFContents = (data: GLTF, required: MeshMetadataGLTF): LoadingResultGLTF | undefined => {
        if (!data.scene) {
            console.error("Unable to process file data, provided data is not a valid GLTF or GLB file");
            return undefined;
        }

        let foundGeometry: THREE.BufferGeometry | undefined;
        let foundMaterials: THREE.Material[] = [];

        const geometryNamesCounts: { [name: string]: number } = {};
        const materialNamesCounts: { [name: string]: number } = {};

        if (required.geometry) {
            data.scene.traverse((node) => {
                if (foundGeometry) {
                    return;
                }

                if (node instanceof THREE.Mesh) {
                    const geometryFound = findMeshGeometryGLTF(node, required.geometry, geometryNamesCounts);

                    if (geometryFound) {
                        foundGeometry = geometryFound;

                        if (required.materials && required.materials.length > 0) {
                            foundMaterials = findMaterialsGLTF(node, required.materials, materialNamesCounts);
                        }
                    }
                }
            });
        }

        if (foundGeometry) {
            return {
                geometry: foundGeometry,
                materials: foundMaterials.length > 0 ? foundMaterials : undefined
            };
        }

        return undefined;
    };
 
    const findMeshGeometryGLTF = (
        node: THREE.Mesh, 
        meshToFind: GeometryMetadata,
        meshNamesCounts: {[name: string]: number}
    ): THREE.BufferGeometry | null => {

        const meshName = node.name;
        const currentTraversalIndex = meshNamesCounts[meshName] ?? 0;

        if (meshName === meshToFind.name && currentTraversalIndex === meshToFind.traversalIndex) {
            meshNamesCounts[meshName] = currentTraversalIndex + 1;
            return node.geometry;
        } else {
            meshNamesCounts[meshName] = currentTraversalIndex + 1;
            return null;
        }
    }

    const findMaterialsGLTF = (
        node: THREE.Mesh,
        materialsToFind: MaterialMetadataGLTF[],
        materialNamesCounts: {[name: string]: number}
    ): THREE.Material[] => {

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

        if (materialsFound.length > 0) {
            return materialsFound;
        }
        return [];
    }

    return loadingResult;
}