import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type ListedMesh = {
    uuid: string,
    name: string,
    materials: ListedMaterial[];
}

export type ListedMaterial = {
    uuid: string,
    name: string,
    type: string;
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

    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            
            const uuid = object.uuid
            const name = object.name;
            const materials: ListedMaterial[] = [];

            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach( material => {
                        if (material.name) {
                            materials.push( {uuid: object.material.uuid, name: material.name, type: material.type} );
                        }
                    });
                } else {
                    if (object.material.name) materials.push({uuid: object.material.uuid, name: object.material.name, type: object.material.type});
                }
            }

            meshes.push({
                uuid,
                name,
                materials
            });
        }
    });

    return { meshes }
}