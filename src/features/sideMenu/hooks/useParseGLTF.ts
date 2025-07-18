import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GeometryMetadata } from "../../../models/assets/meshes/Unwrapped";

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

export type MetadataListingResultGLTF = {
    meshes: ListedMetadataGLTF[];
}

export type LoadingRestultGLTF = {
    geometry: THREE.BufferGeometry;
    materials?: THREE.Material[];
}


export const useParseGLTF = () => {

    const parseGLTF = (data: string | ArrayBuffer): Promise<MetadataListingResultGLTF> => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            try {
                loader.parse(data, '', (gltf) => {
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
                (error) => {
                    console.error(`Failed to parse file data:`, error);
                    reject(error);
                });
            } catch (error) {
                console.error(`Failed to parse file data:`, error);
                reject(error);
            }
        });
    }


    const loadGLTF = (data: string | ArrayBuffer, requiredMesh: GeometryMetadata, requiredMaterials?: MaterialMetadataGLTF[]): Promise<LoadingRestultGLTF> => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            loader.parse(data, '', (gltf) => {
                const meshNamesCounts: {[name: string]: number} = {};
                let foundGeometry: THREE.BufferGeometry | null = null;
                let foundMaterials: THREE.Material[] = [];
                let isMeshFound = false;

                gltf.scene.traverse( (object) => {
                    if (isMeshFound && (!requiredMaterials || (requiredMaterials.length > 0 && foundMaterials.length === requiredMaterials.length))) {
                        return;
                    }

                    if (!(object instanceof THREE.Mesh)) return;

                    const meshName = object.name;
                    const meshTraversalIndex = meshNamesCounts[meshName] | 0;

                    if (object.name !== requiredMesh.name || meshTraversalIndex !== requiredMesh.traversalIndex) {
                        meshNamesCounts[meshName] = meshTraversalIndex + 1;
                        return;
                    }

                    foundGeometry = object.geometry;
                    isMeshFound = true;

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

                });

                if (foundGeometry) {
                    if (requiredMaterials && foundMaterials.length !== requiredMaterials.length) {
                        console.warn(`Failed to load some of the requested materials for mesh: ${requiredMesh.id}. Expected ${requiredMaterials.length}, found ${foundMaterials.length}.`);
                    }

                    resolve({
                        geometry: foundGeometry,
                        materials: foundMaterials
                    });
                } else {
                    console.error(`Failed to load contents from the file: ${data}, and mesh: ${requiredMesh.id}. Mesh not found.`);
                    reject(new Error("Failed to load contents from the file: Mesh not found"));
                }
            },
            (error) => {
                console.error(`Failed to load contents from the file: ${data}, and mesh: ${requiredMesh.id}`, error);
                reject(error);
            });
        });
    }

    return { parseGLTF, loadGLTF };
}