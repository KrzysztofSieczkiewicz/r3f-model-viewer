import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

    const parseGLTF = (blobUrl: string): Promise<MetadataListingResultGLTF> => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(blobUrl, (gltf) => {
                const meshes: ListedMetadataGLTF[] = [];
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
                            mesh: { id: `${meshName}_${currentMeshNameCount}`, name: meshName, traversalIndex: currentMeshNameCount },
                            materials
                        })
                        meshNamesCounts[meshName] = currentMeshNameCount + 1;
                    }
                });
                resolve({ meshes });
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
    ): Promise<THREE.Mesh> => {
        const loader = new GLTFLoader();
    
        return new Promise((resolve, reject) => {
            loader.load(blobUrl, (gltf: GLTF) => {
                const meshNamesCounts: Record<string, number> = {};
                let targetMesh: THREE.Mesh | null = null;
    
                gltf.scene.traverse((object) => {
                    if (targetMesh || !(object instanceof THREE.Mesh)) return;
    
                    const meshName = object.name || "unnamed";
                    const meshTraversalIndex = meshNamesCounts[meshName] || 0;
    
                    if (meshName === requiredMesh.name && meshTraversalIndex === requiredMesh.traversalIndex) {
                        let finalMaterial: THREE.Material | THREE.Material[];
    
                        if (requiredMaterials && requiredMaterials.length > 0) {
                            const meshMaterials = Array.isArray(object.material) 
                                ? object.material 
                                : [object.material];
    
                            const filtered = requiredMaterials.map(reqMat => {
                                const matNamesCounts: Record<string, number> = {};
                                return meshMaterials.find(m => {
                                    const mIndex = matNamesCounts[m.name] || 0;
                                    matNamesCounts[m.name] = mIndex + 1;
                                    return m.name === reqMat.name && mIndex === reqMat.traversalIndex;
                                });
                            }).filter((m): m is THREE.Material => !!m);
    
                            finalMaterial = filtered.length === 1 ? filtered[0] : filtered;
                        } else {
                            finalMaterial = object.material;
                        }
                        targetMesh = new THREE.Mesh(object.geometry, finalMaterial);
                        targetMesh.name = object.name;
                    }
    
                    meshNamesCounts[meshName] = meshTraversalIndex + 1;
                });
    
                if (targetMesh) {
                    URL.revokeObjectURL(blobUrl); 
                    resolve(targetMesh);
                } else {
                    reject(new Error(`Mesh ${requiredMesh.name} at index ${requiredMesh.traversalIndex} not found`));
                }
            }, 
            undefined,
            (error) => reject(error));
        });
    };






    const parseGLTFfromArrayBuffer = (data: string | ArrayBuffer): Promise<MetadataListingResultGLTF> => {
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
                })
            } catch (error) {
                console.error(`Failed to parse file data:`, error);
                reject(error);
            }
        });
    }


    const loadGLTFfromArrayBuffer = (data: string | ArrayBuffer, requiredMesh: GeometryMetadata, requiredMaterials?: MaterialMetadataGLTF[]): Promise<LoadingRestultGLTF> => {
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