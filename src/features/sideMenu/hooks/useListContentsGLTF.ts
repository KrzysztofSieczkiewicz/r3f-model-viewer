import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type ListedMesh = {
    name: string,
    materials: ListedMaterial[],
}

export type ListedMaterial = {
    name: string;
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
            
            const name = object.name;
            const materials: ListedMaterial[] = [];

            if (object.material) {
                console.log({material: object.material})
                if (Array.isArray(object.material)) {
                    object.material.forEach( material => {
                        if (material.name) {
                            materials.push( {name: material.name, type: material.type} );
                        }
                    });
                } else {
                    if (object.material.name) materials.push({name: object.material.name, type: object.material.type});
                }
            }

            meshes.push({
                name,
                materials
            });
        }
    });

    console.log(meshes)

    return { meshes }
}