import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type ListedMetadataGLTF = {
    mesh: MeshMetadataGLTF,
    materials: MaterialMetadataGLTF[]
}

export type MeshMetadataGLTF = {
    id: string,
    name: string,
    traversalIndex: number,
}

export type MaterialMetadataGLTF = {
    id: string,
    name: string,
    type: string,
    traversalIndex: number,
}

type MetadataListingResultGLTF = {
    meshes: ListedMetadataGLTF[];
}

type LoadingRestultGLTF = {
    geometry: THREE.BufferGeometry;
    material: THREE.Material | null;
}

export const useImportGLTF = () => {
    
    const getContents = (src: string): Promise<MetadataListingResultGLTF> => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(
                src, 
                (gltf) => {
                    const meshes: ListedMetadataGLTF[] = [];
                    const meshNamesCounts: {[name: string]: number} = {};

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
                                mesh: { id: `${meshName}_${currentMeshNameCount}`, name: meshName, traversalIndex: currentMeshNameCount },
                                materials
                            })
                            meshNamesCounts[meshName] = currentMeshNameCount + 1;
                        }
                    });

                    resolve( {meshes} )
                },
                undefined,
                (error) => {
                    console.error(`Failed loading and parsing GLTF file: ${src}`, error)
                    reject(error)
                }
            );
        });
    };

    const loadGeometry = (src: string, required: MeshMetadataGLTF) => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(
                src,
                (gltf) => {
                    const meshNamesCounts: {[name: string]: number} = {};
                    let foundGeometry: THREE.BufferGeometry | null = null;

                    gltf.scene.traverse( (object) => {
                        if (object instanceof THREE.Mesh) {
                            const meshName = object.name;
                            const meshTraversalIndex = meshNamesCounts[meshName] || 0;

                            if (meshName === required.name && meshTraversalIndex === required.traversalIndex) {
                                foundGeometry = object.geometry;
                                return;
                            }

                            meshNamesCounts[meshName] = meshTraversalIndex + 1;
                        }
                    });

                    if (foundGeometry) {
                        resolve(foundGeometry);
                    } else {
                        console.error(`Geometry with name '${required.name}' and traversal index ${required.traversalIndex} not found in GLTF file: ${src}`);
                        resolve(null);
                    }
                },
                undefined,
                (error) => {
                    console.error(`Failed to load geometry from GLTF file: ${src}`, error);
                    reject(error);
                }
            );
        })
    }

    const loadContents = (src: string, requiredMesh: MeshMetadataGLTF, requiredMaterial?: MaterialMetadataGLTF): Promise<LoadingRestultGLTF> => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(
                src,
                (gltf) => {
                    const meshNamesCounts: {[name: string]: number} = {};
                    let foundGeometry: THREE.BufferGeometry | null = null;
                    let foundMaterial: THREE.Material | null = null;
                    let isFound = false;

                    gltf.scene.traverse( (object) => {
                        if (isFound) return;
                        if (!(object instanceof THREE.Mesh)) return;

                        const meshName = object.name;
                        const meshTraversalIndex = meshNamesCounts[meshName] | 0;
                        const materialNamesCounts: {[name: string]: number} = {};

                        if (object.name !== requiredMesh.name || meshTraversalIndex !== requiredMesh.traversalIndex) {
                            meshNamesCounts[meshName] = meshTraversalIndex + 1;
                            return;
                        }
                        foundGeometry = object.geometry;
                        isFound = true;

                        if (requiredMaterial) {
                            const materials = Array.isArray(object.material) 
                            ? object.material 
                            : [object.material].filter(Boolean);
                            
                            foundMaterial = materials.find( (material) => {
                                const materialTraversalIndex = materialNamesCounts[material.name] | 0;
                                materialNamesCounts[material.name] = materialTraversalIndex + 1;
                                return (material.name === requiredMaterial.name && materialTraversalIndex === requiredMaterial.traversalIndex)
                            })
                        }
                            
                        
                    });

                    if(requiredMaterial && !foundMaterial) {
                        console.error(`Failed to load material from the file: ${src}, for mesh: ${requiredMesh.id}`);
                    }
                    if (foundGeometry) {
                        resolve({
                            geometry: foundGeometry,
                            material: foundMaterial});
                    } else {
                        console.error(`Failed to load contents from the file: ${src}, and mesh: ${requiredMesh.id}`);
                        reject(new Error("Failed to load contents from the file"));
                    }
                },
                undefined,
                (error) => {
                    console.error(`Failed to load contents from the file: ${src}, and mesh: ${requiredMesh.id}`, error);
                    reject(error);
                }
            );
        });
    }

    return { getContents, loadGeometry, loadContents }
}