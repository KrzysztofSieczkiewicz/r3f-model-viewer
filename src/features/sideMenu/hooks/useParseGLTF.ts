import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GeometryMetadata } from "../../../models/assets/meshes/Unwrapped";

export type ListedMeshMetadataGLTF = {
    geometry: GeometryMetadata,
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


export const useParseGLTF = () => {

    const parseGLTF = (blobUrl: string): Promise<ListedMeshMetadataGLTF[]> => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(blobUrl, (gltf) => {
                const meshes: ListedMeshMetadataGLTF[] = [];
                const meshNamesCounts: { [name: string]: number} = {}; 

                gltf.scene.traverse( (object) => {
                    if (object instanceof THREE.Mesh) {
                        const meshName = object.name;
                        const currentMeshNameCount = meshNamesCounts[meshName] || 0;

                        const materials: MaterialMetadataGLTF[] = [];
                        const materialNamesCounts: {[name: string]: number} = {};

                        const objectMaterials = Array.isArray(object.material)
                        ? object.material
                        : [object.material].filter(Boolean);

                        objectMaterials.forEach( (material) => {
                            const materialName = material.name;
                            const currentMaterialCount = materialNamesCounts[materialName] || 0;

                            materials.push({
                                id: `${materialName}_${currentMaterialCount}`,
                                name: materialName,
                                type: material.type,
                                traversalIndex: currentMaterialCount
                            });
                            materialNamesCounts[materialName] = currentMaterialCount + 1;
                        });

                        meshes.push({
                            geometry: { id: `${meshName}_${currentMeshNameCount}`, name: meshName, traversalIndex: currentMeshNameCount },
                            materials
                        })
                        meshNamesCounts[meshName] = currentMeshNameCount + 1;
                    }
                });
                resolve(meshes);
            },
            undefined,
            (error) => {
                console.error(`Failed to parse file data:`, error);
                reject(error);
            });
        });
    }

    const loadGLTF = async (
        blobUrl: string, 
        requiredMesh: GeometryMetadata, 
        requiredMaterials?: MaterialMetadataGLTF[]
    ): Promise<LoadingRestultGLTF> => {
        const loader = new GLTFLoader();
    
        return new Promise((resolve, reject) => {
            loader.load(blobUrl, (gltf) => {
                const meshNamesCounts: { [name: string]: number } = {};
                let foundGeometry: THREE.BufferGeometry | null = null;
                let foundMaterials: THREE.Material[] = [];
                let isMeshFound = false;
    
                gltf.scene.traverse((object) => {
                    // stop traversal if everything is already found
                    if (isMeshFound && (!requiredMaterials || (requiredMaterials.length > 0 && foundMaterials.length === requiredMaterials.length))) {
                        return;
                    }
    
                    if (!(object instanceof THREE.Mesh)) return;
    
                    const meshName = object.name || "unnamed";
                    const meshTraversalIndex = meshNamesCounts[meshName] || 0;
    
                    // find requested mesh node by name and traversal index
                    if (meshName !== requiredMesh.name || meshTraversalIndex !== requiredMesh.traversalIndex) {
                        meshNamesCounts[meshName] = meshTraversalIndex + 1;
                        return;
                    }
    
                    foundGeometry = object.geometry;
                    isMeshFound = true;
    
                    // find requested materials
                    if (requiredMaterials && requiredMaterials.length > 0) {
                        const materialNamesCounts: { [name: string]: number } = {};
                        const meshMaterials = Array.isArray(object.material)
                            ? object.material
                            : [object.material].filter(Boolean);
    
                        requiredMaterials.forEach((requiredMatMetadata) => {
                            const foundMat = meshMaterials.find((material) => {
                                const materialTraversalIndex = materialNamesCounts[material.name] || 0;
                                
                                if (material.name === requiredMatMetadata.name) {
                                    materialNamesCounts[material.name] = materialTraversalIndex + 1;
                                    return materialTraversalIndex === requiredMatMetadata.traversalIndex;
                                }
                                return false;
                            });
    
                            if (foundMat) {
                                foundMaterials.push(foundMat);
                            } else {
                                console.warn(`Required material "${requiredMatMetadata.name}" (traversal index ${requiredMatMetadata.traversalIndex}) not found for mesh "${requiredMesh.name}".`);
                            }
                        });
                    } else if (!requiredMaterials) {
                        // if no specific materials requested, take the mesh's defaults
                        if (Array.isArray(object.material)) {
                            foundMaterials = [...object.material];
                        } else if (object.material) {
                            foundMaterials.push(object.material);
                        }
                    }
                });
    
                // TODO: ensure that this is the right place to do so
                // release the URL immediately after processing
                URL.revokeObjectURL(blobUrl);
    
                // final resolution
                if (foundGeometry) {
                    if (requiredMaterials && foundMaterials.length !== requiredMaterials.length) {
                        console.warn(`Failed to load the requested materials for mesh: ${requiredMesh.id}. Expected ${requiredMaterials.length}, found ${foundMaterials.length}.`);
                    }

                    console.log({foundGeometry});
                    console.log({foundMaterials});
    
                    resolve({
                        geometry: foundGeometry,
                        materials: foundMaterials
                    });
                } else {
                    console.error(`Failed to load contents: Mesh ${requiredMesh.name} at index ${requiredMesh.traversalIndex} not found.`);
                    reject(new Error("Mesh not found"));
                }
            }, 
            undefined, 
            (error) => {
                URL.revokeObjectURL(blobUrl);
                reject(error);
            });
        });
    };



    return { parseGLTF, loadGLTF };
}