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

    const loadGeometry = (src: string, mesh: MeshMetadataGLTF) => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(
                src,
                (gltf) => {
                },
                undefined,
                (error) => {
                    console.error(`Failed loading geometry from GLTF file: ${src}`, error)
                    reject(error)
                }
            )
        })
    }

    return { getContents }
}