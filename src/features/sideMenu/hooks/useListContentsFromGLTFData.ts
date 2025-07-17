import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GeometryMetadataGLTF } from "../../../models/assets/meshes/Unwrapped";

export type ListedMetadataGLTF = {
    mesh: GeometryMetadataGLTF,
    materials: MaterialMetadataGLTF[]
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

export const useListContentsFromGLTFData = () => {

    const getContents = (data: string): Promise<MetadataListingResultGLTF> => {
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
                    console.error(`Failed parsing GLTF data:`, error);
                    reject(error);
                });
            } catch (error) {
                console.error(`Failed to parse GLTF data:`, error);
                reject(error);
            }
        });
    };

    const loadGeometry = (data: string, required: GeometryMetadataGLTF) => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            try {
                loader.parse(data, '', (gltf) => {
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
                        console.error(`Geometry with name '${required.name}' and traversal index ${required.traversalIndex} not found in GLTF data.`);
                        resolve(null);
                    }
                },
                (error) => {
                    console.error(`Failed to parse geometry from GLTF data:`, error);
                    reject(error);
                });
            } catch (error) {
                console.error(`Failed to parse GLTF data for geometry loading:`, error);
                reject(error);
            }
        })
    }

    const loadContents = (data: string, requiredMesh: GeometryMetadataGLTF, requiredMaterial: MaterialMetadataGLTF | null): Promise<LoadingRestultGLTF> => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            try {
                loader.parse(data, '', (gltf) => {
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
                        console.error(`Failed to load material from the data, for mesh: ${requiredMesh.id}`);
                    }
                    if (foundGeometry) {
                        resolve({
                            geometry: foundGeometry,
                            material: foundMaterial});
                    } else {
                        console.error(`Failed to load contents from the data, and mesh: ${requiredMesh.id}`);
                        reject(new Error("Failed to load contents from the data"));
                    }
                },
                (error) => {
                    console.error(`Failed to parse contents from the GLTF data, and mesh: ${requiredMesh.id}`, error);
                    reject(error);
                });
            } catch (error) {
                console.error(`Failed to parse GLTF data for content loading:`, error);
                reject(error);
            }
        });
    }

    return { getContents, loadGeometry, loadContents }
}