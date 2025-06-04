import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type ListedMesh = {
    name: string,
    traversalIndex: number;
    materials: ListedMaterial[];
}

export type ListedMaterial = {
    name: string,
    traversalIndex: number;
    type: string;
}

type MeshMetadataGLTF = {
    id: string,
    name: string,
    traversalIndex: number,
    materials: MaterialMetadataGLTF[],
}

type MaterialMetadataGLTF = {
    id: string,
    name: string,
    type: string,
    traversalIndex: number,
}

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh | THREE.Object3D;
    };
    materials: {
        [key: string]: THREE.Material;
    };
};

export const useListContentsGLTF = (src: string) => {
    
    const { scene } = useGLTF(src) as unknown as GLTFResult;

    const meshes: ListedMesh[] = [];
    const meshesNameCounts: { [name:string]: number } = {};
    

    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            
            const name = object.name;
            const currentMeshNameCount = meshesNameCounts[name] || 0;
            const materialsNameCounts: { [name:string]: number } = {};

            const materials: ListedMaterial[] = [];

            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach( material => {
                        const currentMaterialNameCount = materialsNameCounts[material.name] || 0;

                        materials.push({
                                name: material.name,
                                traversalIndex: currentMaterialNameCount,
                                type: material.type
                            });
                        materialsNameCounts[material.name] = currentMaterialNameCount + 1;
                    });
                } else {
                    const currentMaterialNameCount = materialsNameCounts[object.material.name] || 0;

                    materials.push({
                        name: object.material.name,
                        traversalIndex: currentMaterialNameCount,
                        type: object.material.type
                    });
                    materialsNameCounts[object.material.name] = currentMaterialNameCount + 1;
                }
            }

            meshes.push({
                name,
                traversalIndex: currentMeshNameCount,
                materials
            });

            meshesNameCounts[name] = currentMeshNameCount + 1;
        }
    });


    const getMeshes = () => {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();

            loader.load(
                src, 
                (gltf) => {
                    const meshes: MeshMetadataGLTF[] = [];
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
                                id: `${meshName}_${currentMeshNameCount}`,
                                name: meshName,
                                traversalIndex: currentMeshNameCount,
                                materials: materials,
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

    return { meshes }
}